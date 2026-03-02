"""Tela Explorar: análise individual de ativos e modo comparação."""

import streamlit as st
import pandas as pd
from config.assets import ASSET_CATEGORIES, ALL_PRELOADED
from data.asset_registry import get_asset_info, get_all_asset_names
from data.fetchers.yfinance_fetcher import get_price_history, get_asset_info as yf_info, get_dividends
from data.fetchers.fundamentus_fetcher import get_fundamentus_data
from data.fetchers.statusinvest_fetcher import get_statusinvest_data, get_fii_dividends
from data.fetchers.coingecko_fetcher import get_btc_market_data
from data.fetchers.fear_greed_fetcher import get_fear_greed_index, fear_greed_color
from analytics.metrics import (
    total_return, period_return, annualized_return, volatility,
    sharpe_ratio, max_drawdown, rsi, mayer_multiple,
    moving_average, sma_200_weeks, normalize_base100,
)
from analytics.currency import get_converter
from ui.components import (
    metric_card, metric_row, section_header, info_box, warning_box,
    format_pct, format_number, pct_color, asset_selector, multi_asset_selector,
    styled_dataframe,
)
from ui.charts import (
    price_chart_with_ma, multi_line_chart,
    gauge_chart, dividend_chart, bar_chart,
)
from config.constants import COLORS


def render_explorar():
    st.markdown("## Explorar Ativos")

    st.markdown("""<style>
        .stTabs [data-baseweb="tab-list"] { gap: 24px; }
        .stTabs [data-baseweb="tab"] { padding: 10px 24px; font-size: 16px; }
    </style>""", unsafe_allow_html=True)

    tab1, tab2 = st.tabs(["  Ativo Individual  ", "  Comparação  "])

    with tab1:
        _render_individual()

    with tab2:
        _render_comparison()


def _set_quick_ticker(asset: str):
    st.session_state.explore_ticker = asset

def _render_individual():
    with st.expander("Atalhos rápidos"):
        for cat_name, cat_assets in ASSET_CATEGORIES.items():
            cols = st.columns(len(cat_assets))
            for i, asset in enumerate(cat_assets):
                cols[i].button(
                    asset,
                    key=f"quick_{cat_name}_{asset}",
                    use_container_width=True,
                    on_click=_set_quick_ticker,
                    args=(asset,),
                )

    selected = st.text_input(
        "Digite o ticker do ativo",
        key="explore_ticker",
    )

    selected = selected.strip().upper() if selected and selected.strip() else None

    if not selected:
        return

    asset_info = get_asset_info(selected)
    ticker = asset_info["ticker"]
    tipo = asset_info["tipo"]
    nome = asset_info["nome"]

    st.markdown(f"### {nome} ({selected})")

    if ticker is None:
        info_box(f"{nome} usa dados do BCB, não possui gráfico de preço via ticker.")
        return

    with st.spinner(f"Carregando dados de {selected}..."):
        prices_df = get_price_history(ticker)

    if prices_df.empty:
        st.error(f"Não foi possível carregar dados para {selected} ({ticker})")
        return

    close = prices_df["Close"]

    # Gráfico de preço
    if tipo == "cripto":
        ma200w = sma_200_weeks(close)
        fig = price_chart_with_ma(close, ma200w, title=f"{nome} - Preço Histórico", ma_label="MM 200 semanas")
    else:
        ma200 = moving_average(close, 200)
        fig = price_chart_with_ma(close, ma200, title=f"{nome} - Preço Histórico", ma_label="MM 200 dias")

    st.plotly_chart(fig, use_container_width=True)

    # Converter preço atual
    converter = get_converter()
    display_currency = st.session_state.get("global_currency", "BRL")
    current_price = float(close.iloc[-1])
    converted_price = converter.convert(current_price, asset_info["moeda"], display_currency)
    price_formatted = converter.format_value(converted_price, display_currency)

    # Métricas
    if tipo in ("acao_br", "acao_us", "etf"):
        _render_stock_metrics(selected, ticker, close, tipo, price_formatted, display_currency)
    elif tipo == "cripto":
        _render_btc_metrics(close, price_formatted)
    elif tipo == "fii":
        _render_fii_metrics(selected, ticker, close, price_formatted)
    else:
        _render_generic_metrics(close, price_formatted, display_currency)


def _render_stock_metrics(selected, ticker, close, tipo, price_formatted, display_currency):
    """Métricas para ações BR/US e ETFs."""
    ret_1a = period_return(close, 1)
    ret_5a = period_return(close, 5)
    ret_max = total_return(close)
    vol = volatility(close)
    sharpe = sharpe_ratio(close)
    mdd = max_drawdown(close)

    section_header("Performance")
    metric_row([
        {"label": "Preço Atual", "value": price_formatted},
        {"label": "Retorno 1A", "value": format_pct(ret_1a) if ret_1a else "N/A", "delta_color": pct_color(ret_1a)},
        {"label": "Retorno 5A", "value": format_pct(ret_5a) if ret_5a else "N/A", "delta_color": pct_color(ret_5a)},
        {"label": "Retorno Total", "value": format_pct(ret_max), "delta_color": pct_color(ret_max)},
    ])

    section_header("Risco")
    metric_row([
        {"label": "Volatilidade", "value": format_pct(vol)},
        {"label": "Sharpe Ratio", "value": format_number(sharpe)},
        {"label": "Max Drawdown", "value": format_pct(mdd), "delta_color": COLORS["red"]},
    ])

    # Fundamentalistas
    fundamentals = _get_fundamentals(selected, ticker, tipo)
    if fundamentals:
        section_header("Fundamentalistas")
        fund_metrics = []
        if "pl" in fundamentals:
            fund_metrics.append({"label": "P/L", "value": format_number(fundamentals["pl"])})
        if "dividend_yield" in fundamentals:
            fund_metrics.append({"label": "Dividend Yield", "value": format_pct(fundamentals["dividend_yield"])})
        if "payout" in fundamentals:
            fund_metrics.append({"label": "Payout", "value": format_pct(fundamentals["payout"])})
        if "lpa" in fundamentals:
            fund_metrics.append({"label": "LPA", "value": format_number(fundamentals["lpa"])})
        if "roe" in fundamentals:
            fund_metrics.append({"label": "ROE", "value": format_pct(fundamentals["roe"])})
        if "pvp" in fundamentals:
            fund_metrics.append({"label": "P/VP", "value": format_number(fundamentals["pvp"])})

        if fund_metrics:
            rows = [fund_metrics[i:i+4] for i in range(0, len(fund_metrics), 4)]
            for row in rows:
                metric_row(row)


def _get_fundamentals(selected, ticker, tipo):
    """Busca fundamentalistas priorizando Fundamentus/StatusInvest, fallback yfinance."""
    fundamentals = {}

    if tipo == "acao_br":
        fundamentals = get_fundamentus_data(ticker)
        if not fundamentals:
            fundamentals = get_statusinvest_data(ticker, "acao_br")

    if not fundamentals:
        try:
            info = yf_info(ticker)
            if info:
                mappings = {
                    "trailingPE": "pl",
                    "forwardPE": "pl_forward",
                    "dividendYield": "dividend_yield",
                    "payoutRatio": "payout",
                    "trailingEps": "lpa",
                    "bookValue": "vpa",
                    "returnOnEquity": "roe",
                    "priceToBook": "pvp",
                    "grossMargins": "margem_bruta",
                    "profitMargins": "margem_liquida",
                }
                for yf_key, clean_key in mappings.items():
                    val = info.get(yf_key)
                    if val is not None:
                        fundamentals[clean_key] = float(val)
        except Exception:
            pass

    return fundamentals


def _render_btc_metrics(close, price_formatted):
    """Métricas específicas para Bitcoin."""
    section_header("Preço e Performance")

    ret_1a = period_return(close, 1)
    ret_5a = period_return(close, 5)
    ret_max = total_return(close)

    metric_row([
        {"label": "Preço Atual", "value": price_formatted},
        {"label": "Retorno 1A", "value": format_pct(ret_1a) if ret_1a else "N/A", "delta_color": pct_color(ret_1a)},
        {"label": "Retorno 5A", "value": format_pct(ret_5a) if ret_5a else "N/A", "delta_color": pct_color(ret_5a)},
        {"label": "Retorno Total", "value": format_pct(ret_max), "delta_color": pct_color(ret_max)},
    ])

    # Indicadores técnicos
    section_header("Indicadores Técnicos")

    rsi_val = rsi(close, 14)
    mayer = mayer_multiple(close)
    fg = get_fear_greed_index()

    col1, col2, col3 = st.columns(3)

    with col1:
        fig = gauge_chart(rsi_val or 0, "RSI (14d)")
        st.plotly_chart(fig, use_container_width=True)
        if rsi_val:
            if rsi_val > 70:
                warning_box("RSI acima de 70: zona de sobrecompra")
            elif rsi_val < 30:
                info_box("RSI abaixo de 30: zona de sobrevenda")

    with col2:
        mayer_display = mayer if mayer else 0
        fig = gauge_chart(min(mayer_display * 33.3, 100), "Mayer Multiple")
        st.plotly_chart(fig, use_container_width=True)
        if mayer:
            st.markdown(f"**Valor:** {mayer:.2f}")
            if mayer < 1.0:
                info_box("Mayer < 1.0: preço abaixo da MM 200 dias (historicamente zona de acumulação)")
            elif mayer > 2.4:
                warning_box("Mayer > 2.4: historicamente zona de sobrevalorização")

    with col3:
        fg_val = fg.get("value")
        fig = gauge_chart(fg_val or 0, "Fear & Greed")
        st.plotly_chart(fig, use_container_width=True)
        if fg_val is not None:
            color = fear_greed_color(fg_val)
            st.markdown(f'<span style="color:{color};font-weight:600">{fg["classification"]}</span>', unsafe_allow_html=True)

    # CoinGecko supplementar
    cg_data = get_btc_market_data()
    if cg_data:
        section_header("Dados de Mercado (CoinGecko)")
        cg_metrics = []
        if cg_data.get("market_cap_usd"):
            cg_metrics.append({"label": "Market Cap", "value": f"$ {cg_data['market_cap_usd']/1e9:,.1f}B"})
        if cg_data.get("volume_24h_usd"):
            cg_metrics.append({"label": "Volume 24h", "value": f"$ {cg_data['volume_24h_usd']/1e9:,.1f}B"})
        if cg_data.get("ath_usd"):
            cg_metrics.append({"label": "ATH", "value": f"$ {cg_data['ath_usd']:,.0f}"})
        if cg_data.get("circulating_supply"):
            cg_metrics.append({"label": "Supply Circulante", "value": f"{cg_data['circulating_supply']/1e6:,.2f}M"})
        if cg_metrics:
            metric_row(cg_metrics)

    # MVRV indisponível
    info_box("MVRV Z-Score: indisponível em APIs gratuitas. Consulte: <a href='https://www.lookintobitcoin.com/charts/mvrv-zscore/' target='_blank'>lookintobitcoin.com</a>")


def _render_fii_metrics(selected, ticker, close, price_formatted):
    """Métricas específicas para FIIs."""
    section_header("Performance")

    ret_1a = period_return(close, 1)
    ret_max = total_return(close)
    vol = volatility(close)

    metric_row([
        {"label": "Preço Atual", "value": price_formatted},
        {"label": "Retorno 1A", "value": format_pct(ret_1a) if ret_1a else "N/A", "delta_color": pct_color(ret_1a)},
        {"label": "Retorno Total", "value": format_pct(ret_max), "delta_color": pct_color(ret_max)},
        {"label": "Volatilidade", "value": format_pct(vol)},
    ])

    # Fundamentalistas via StatusInvest primeiro, fallback yfinance
    fundamentals = get_statusinvest_data(ticker, "fii")
    if not fundamentals:
        fundamentals = _get_fundamentals(selected, ticker, "fii")

    if fundamentals:
        section_header("Fundamentos")
        fund_metrics = []
        if "dividend_yield" in fundamentals:
            fund_metrics.append({"label": "Dividend Yield", "value": format_pct(fundamentals["dividend_yield"])})
        if "pvp" in fundamentals:
            fund_metrics.append({"label": "P/VP", "value": format_number(fundamentals["pvp"])})
        if fund_metrics:
            metric_row(fund_metrics)

    # Dividendos
    section_header("Dividendos Mensais")
    divs = get_fii_dividends(ticker)
    if divs.empty:
        divs_yf = get_dividends(ticker)
        if not divs_yf.empty:
            fig = dividend_chart(divs_yf, f"Dividendos - {selected}")
            st.plotly_chart(fig, use_container_width=True)
        else:
            info_box("Dados de dividendos indisponíveis")
    else:
        fig = dividend_chart(divs["valor"] if "valor" in divs.columns else divs.iloc[:, 0], f"Dividendos - {selected}")
        st.plotly_chart(fig, use_container_width=True)


def _render_generic_metrics(close, price_formatted, display_currency):
    """Métricas genéricas para commodities e benchmarks."""
    ret_1a = period_return(close, 1)
    ret_5a = period_return(close, 5)
    ret_max = total_return(close)
    vol = volatility(close)

    section_header("Performance")
    metric_row([
        {"label": "Preço Atual", "value": price_formatted},
        {"label": "Retorno 1A", "value": format_pct(ret_1a) if ret_1a else "N/A", "delta_color": pct_color(ret_1a)},
        {"label": "Retorno 5A", "value": format_pct(ret_5a) if ret_5a else "N/A", "delta_color": pct_color(ret_5a)},
        {"label": "Volatilidade", "value": format_pct(vol)},
    ])


def _render_comparison():
    """Modo comparação: até 4 ativos lado a lado."""
    st.markdown("### Comparação de Ativos")
    info_box("Selecione até 4 ativos para comparar lado a lado (gráfico normalizado base 100)")

    selected = st.multiselect(
        "Ativos para comparar",
        ALL_PRELOADED,
        max_selections=4,
        key="compare_assets",
    )

    custom = st.text_input(
        "Adicionar ticker personalizado (separar por vírgula)",
        key="compare_custom",
        placeholder="Ex: AAPL, PETR4",
    )
    if custom.strip():
        for t in custom.split(","):
            t = t.strip().upper()
            if t and t not in selected and len(selected) < 4:
                selected.append(t)

    if len(selected) < 2:
        info_box("Selecione pelo menos 2 ativos para comparar")
        return

    with st.spinner("Carregando dados para comparação..."):
        prices_dict = {}
        for asset_name in selected:
            info = get_asset_info(asset_name)
            if info["ticker"]:
                df = get_price_history(info["ticker"])
                if not df.empty:
                    prices_dict[asset_name] = df["Close"]

    if len(prices_dict) < 2:
        st.error("Não foi possível carregar dados suficientes para comparação")
        return

    # Determinar range de datas disponível
    from datetime import datetime, date
    from dateutil.relativedelta import relativedelta

    all_dates = set()
    for s in prices_dict.values():
        all_dates.update(s.index)
    min_date = min(all_dates).date()
    max_date = max(all_dates).date()

    # Botões de janela temporal
    window_options = {"1M": 1, "3M": 3, "6M": 6, "1A": 12, "2A": 24, "5A": 60, "10A": 120, "15A": 180, "Max": None}
    cols_w = st.columns(len(window_options))
    if "compare_window" not in st.session_state:
        st.session_state.compare_window = "Max"
    for i, (label, months) in enumerate(window_options.items()):
        if cols_w[i].button(label, key=f"cmp_w_{label}", use_container_width=True,
                            type="primary" if st.session_state.compare_window == label else "secondary"):
            st.session_state.compare_window = label
            st.rerun()

    # Filtrar dados pela janela selecionada
    selected_months = window_options[st.session_state.compare_window]
    if selected_months is not None:
        cutoff = datetime.now() - relativedelta(months=selected_months)
        filtered_dict = {}
        for name, series in prices_dict.items():
            s = series.loc[series.index >= cutoff]
            if not s.empty:
                filtered_dict[name] = s
    else:
        filtered_dict = prices_dict

    if len(filtered_dict) < 2:
        st.error("Dados insuficientes para o período selecionado")
        return

    # Gráfico normalizado (recalculado para a janela)
    normalized = normalize_base100(filtered_dict)
    fig = multi_line_chart(normalized, "Comparação Normalizada (Base 100)", "Valor (Base 100)")
    st.plotly_chart(fig, use_container_width=True)

    # Tabela comparativa
    section_header("Tabela Comparativa")
    converter = get_converter()
    display_currency = st.session_state.get("global_currency", "BRL")

    rows = []
    for asset_name, close in prices_dict.items():
        info = get_asset_info(asset_name)
        current = float(close.iloc[-1])
        converted = converter.convert(current, info["moeda"], display_currency)

        rows.append({
            "Ativo": asset_name,
            "Preço": converter.format_value(converted, display_currency),
            "Retorno 1A": format_pct(period_return(close, 1)),
            "Retorno 5A": format_pct(period_return(close, 5)),
            "Retorno Total": format_pct(total_return(close)),
            "Volatilidade": format_pct(volatility(close)),
            "Sharpe": format_number(sharpe_ratio(close)),
            "Max Drawdown": format_pct(max_drawdown(close)),
        })

    df = pd.DataFrame(rows)
    styled_dataframe(df)

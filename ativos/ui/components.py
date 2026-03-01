"""Componentes reutilizáveis de UI: cards, tabelas, seletores."""

import streamlit as st
import pandas as pd
from config.constants import COLORS


def metric_card(label: str, value: str, delta: str = None, delta_color: str = None):
    """Renderiza um card de métrica estilizado."""
    delta_html = ""
    if delta:
        color = delta_color or COLORS["text_muted"]
        delta_html = f'<div class="metric-delta" style="color: {color};">{delta}</div>'

    value_class = "metric-value"
    if delta_color == COLORS["green"]:
        value_class += " positive"
    elif delta_color == COLORS["red"]:
        value_class += " negative"

    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-label">{label}</div>
        <div class="{value_class}">{value}</div>
        {delta_html}
    </div>
    """, unsafe_allow_html=True)


def metric_row(metrics: list):
    """Renderiza uma linha de metric cards.

    Args:
        metrics: Lista de dicts com keys: label, value, delta (opcional), delta_color (opcional)
    """
    cols = st.columns(len(metrics))
    for col, m in zip(cols, metrics):
        with col:
            metric_card(
                label=m.get("label", ""),
                value=m.get("value", "N/A"),
                delta=m.get("delta"),
                delta_color=m.get("delta_color"),
            )


def section_header(title: str):
    """Renderiza cabeçalho de seção estilizado."""
    st.markdown(f'<div class="section-header">{title}</div>', unsafe_allow_html=True)


def info_box(text: str):
    """Renderiza caixa de informação."""
    st.markdown(f'<div class="info-box">{text}</div>', unsafe_allow_html=True)


def warning_box(text: str):
    """Renderiza caixa de aviso."""
    st.markdown(f'<div class="warning-box">{text}</div>', unsafe_allow_html=True)


def format_pct(value: float, decimals: int = 2) -> str:
    """Formata valor como porcentagem."""
    if value is None:
        return "N/A"
    return f"{value * 100:,.{decimals}f}%"


def format_number(value: float, decimals: int = 2) -> str:
    """Formata número com separador de milhar."""
    if value is None:
        return "N/A"
    return f"{value:,.{decimals}f}"


def format_brl(value: float) -> str:
    """Formata valor em reais."""
    if value is None:
        return "N/A"
    return f"R$ {value:,.2f}"


def pct_color(value: float) -> str:
    """Retorna cor baseada no sinal do valor."""
    if value is None:
        return COLORS["text_muted"]
    return COLORS["green"] if value >= 0 else COLORS["red"]


def styled_dataframe(df: pd.DataFrame, height: int = None):
    """Renderiza DataFrame com estilo dark mode."""
    if df.empty:
        st.info("Sem dados disponíveis")
        return

    kwargs = {"hide_index": True, "width": "stretch"}
    if height is not None:
        kwargs["height"] = height
    st.dataframe(df, **kwargs)


def asset_selector(
    available_assets: list,
    key: str = "asset_select",
    label: str = "Selecione um ativo",
    allow_custom: bool = True,
) -> str:
    """Seletor de ativo com opção de input livre.

    Returns:
        Nome do ativo selecionado
    """
    col1, col2 = st.columns([3, 2])

    with col1:
        selected = st.selectbox(label, available_assets, key=key)

    if allow_custom:
        with col2:
            custom = st.text_input(
                "Ou digite um ticker",
                key=f"{key}_custom",
                placeholder="Ex: AAPL, PETR4",
            )
            if custom.strip():
                return custom.strip().upper()

    return selected


def multi_asset_selector(
    available_assets: list,
    max_assets: int = 4,
    key: str = "multi_asset",
    label: str = "Selecione ativos para comparar",
) -> list:
    """Seletor de múltiplos ativos.

    Returns:
        Lista de ativos selecionados
    """
    selected = st.multiselect(
        label,
        available_assets,
        max_selections=max_assets,
        key=key,
    )
    return selected


def loading_placeholder(text: str = "Carregando dados..."):
    """Placeholder de carregamento."""
    return st.empty()

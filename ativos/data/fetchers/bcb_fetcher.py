"""Fetcher de dados do Banco Central do Brasil: CDI, IPCA, Selic, PTAX."""

import requests
import pandas as pd
import streamlit as st
from datetime import datetime, timedelta
from config.constants import BCB_SGS, BCB_SGS_URL


@st.cache_data(ttl=86400, show_spinner=False)
def get_bcb_series(code: int, start_date: str = None) -> pd.DataFrame:
    """Busca série temporal do SGS/BCB.

    Args:
        code: Código da série no SGS
        start_date: Data inicial no formato DD/MM/YYYY
    """
    url = BCB_SGS_URL.format(code=code)
    if start_date:
        url += f"&dataInicial={start_date}"
    try:
        resp = requests.get(url, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        if not data:
            return pd.DataFrame()
        df = pd.DataFrame(data)
        df["data"] = pd.to_datetime(df["data"], format="%d/%m/%Y")
        df["valor"] = pd.to_numeric(df["valor"], errors="coerce")
        df = df.set_index("data").sort_index()
        return df
    except Exception:
        return pd.DataFrame()


@st.cache_data(ttl=86400, show_spinner=False)
def get_cdi_accumulated(start_date: str = "01/01/2000") -> pd.DataFrame:
    """Retorna série do CDI diário acumulado (taxa diária %)."""
    return get_bcb_series(BCB_SGS["CDI"], start_date)


@st.cache_data(ttl=86400, show_spinner=False)
def get_ipca_monthly(start_date: str = "01/01/2000") -> pd.DataFrame:
    """Retorna IPCA mensal (variação %)."""
    return get_bcb_series(BCB_SGS["IPCA"], start_date)


@st.cache_data(ttl=86400, show_spinner=False)
def get_selic(start_date: str = "01/01/2000") -> pd.DataFrame:
    """Retorna taxa Selic meta (% a.a.)."""
    return get_bcb_series(BCB_SGS["SELIC"], start_date)


@st.cache_data(ttl=3600, show_spinner=False)
def get_ptax() -> float:
    """Retorna cotação PTAX de venda (USD/BRL) mais recente."""
    try:
        today = datetime.now()
        for days_back in range(5):
            date = today - timedelta(days=days_back)
            date_str = date.strftime("%m-%d-%Y")
            url = (
                "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/"
                f"CotacaoDolarDia(dataCotacao=@dataCotacao)?"
                f"@dataCotacao='{date_str}'&$format=json"
            )
            resp = requests.get(url, timeout=10)
            resp.raise_for_status()
            data = resp.json()
            if data.get("value"):
                return float(data["value"][-1]["cotacaoVenda"])
        return _ptax_fallback()
    except Exception:
        return _ptax_fallback()


def _ptax_fallback() -> float:
    """Fallback: busca USD/BRL via yfinance."""
    try:
        import yfinance as yf
        tk = yf.Ticker("USDBRL=X")
        hist = tk.history(period="1d")
        if not hist.empty:
            return float(hist["Close"].iloc[-1])
    except Exception:
        pass
    return 5.5  # fallback estático


@st.cache_data(ttl=86400, show_spinner=False)
def get_cdi_index(start_date: str = "01/01/2000") -> pd.Series:
    """Calcula índice acumulado do CDI (base 100)."""
    df = get_cdi_accumulated(start_date)
    if df.empty:
        return pd.Series(dtype=float)
    daily_rate = df["valor"] / 100
    cumulative = (1 + daily_rate).cumprod() * 100
    cumulative.name = "CDI"
    return cumulative


@st.cache_data(ttl=86400, show_spinner=False)
def get_ipca_index(start_date: str = "01/01/2000") -> pd.Series:
    """Calcula índice acumulado do IPCA (base 100)."""
    df = get_ipca_monthly(start_date)
    if df.empty:
        return pd.Series(dtype=float)
    monthly_rate = df["valor"] / 100
    cumulative = (1 + monthly_rate).cumprod() * 100
    cumulative.name = "IPCA"
    return cumulative


def check_bcb_status() -> bool:
    """Verifica se a API do BCB está respondendo."""
    try:
        url = BCB_SGS_URL.format(code=12) + "&dataInicial=01/01/2024"
        resp = requests.get(url, timeout=5)
        return resp.status_code == 200
    except Exception:
        return False

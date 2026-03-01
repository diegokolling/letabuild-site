"""Fetcher de dados via yfinance: preços, fundamentalistas, dividendos."""

import yfinance as yf
import pandas as pd
import streamlit as st
from datetime import datetime, timedelta
import time


@st.cache_data(ttl=3600, show_spinner=False)
def get_price_history(ticker: str, period: str = "max") -> pd.DataFrame:
    """Retorna histórico de preços (OHLCV) para um ticker."""
    try:
        tk = yf.Ticker(ticker)
        df = tk.history(period=period, auto_adjust=True)
        if df.empty:
            return pd.DataFrame()
        df.index = df.index.tz_localize(None)
        return df
    except Exception:
        return pd.DataFrame()


@st.cache_data(ttl=300, show_spinner=False)
def get_btc_price_history(period: str = "max") -> pd.DataFrame:
    """Preço do BTC com TTL mais curto."""
    return get_price_history.__wrapped__("BTC-USD", period)


@st.cache_data(ttl=3600, show_spinner=False)
def get_asset_info(ticker: str) -> dict:
    """Retorna dados fundamentalistas do ativo."""
    try:
        tk = yf.Ticker(ticker)
        info = tk.info
        return info if info else {}
    except Exception:
        return {}


@st.cache_data(ttl=3600, show_spinner=False)
def get_dividends(ticker: str) -> pd.Series:
    """Retorna histórico de dividendos."""
    try:
        tk = yf.Ticker(ticker)
        divs = tk.dividends
        if divs is not None and not divs.empty:
            divs.index = divs.index.tz_localize(None)
        return divs if divs is not None else pd.Series(dtype=float)
    except Exception:
        return pd.Series(dtype=float)


@st.cache_data(ttl=3600, show_spinner=False)
def get_multiple_prices(tickers: tuple, period: str = "max") -> dict:
    """Baixa preços de múltiplos tickers de uma vez."""
    results = {}
    try:
        data = yf.download(list(tickers), period=period, auto_adjust=True, progress=False, threads=True)
        if data.empty:
            return results

        if len(tickers) == 1:
            df = data.copy()
            df.index = df.index.tz_localize(None) if df.index.tz else df.index
            results[tickers[0]] = df
        else:
            for ticker in tickers:
                try:
                    df = data.xs(ticker, axis=1, level=1) if isinstance(data.columns, pd.MultiIndex) else data
                    df.index = df.index.tz_localize(None) if df.index.tz else df.index
                    df = df.dropna(how="all")
                    if not df.empty:
                        results[ticker] = df
                except (KeyError, Exception):
                    continue
    except Exception:
        for ticker in tickers:
            df = get_price_history(ticker, period)
            if not df.empty:
                results[ticker] = df
    return results


@st.cache_data(ttl=3600, show_spinner=False)
def get_current_price(ticker: str) -> float:
    """Retorna preço atual de um ticker."""
    try:
        tk = yf.Ticker(ticker)
        hist = tk.history(period="1d")
        if not hist.empty:
            return float(hist["Close"].iloc[-1])
        info = tk.info
        return float(info.get("regularMarketPrice", info.get("previousClose", 0)))
    except Exception:
        return 0.0

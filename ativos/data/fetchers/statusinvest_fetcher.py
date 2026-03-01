"""Fetcher de dados via StatusInvest (ações BR, FIIs)."""

import requests
import pandas as pd
import streamlit as st


STATUSINVEST_BASE = "https://statusinvest.com.br"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json",
    "Accept-Language": "pt-BR,pt;q=0.9",
}

ENDPOINTS = {
    "acao_br": "/acoes/{ticker}",
    "fii": "/fundos-imobiliarios/{ticker}",
}


@st.cache_data(ttl=3600, show_spinner=False)
def get_statusinvest_data(ticker: str, asset_type: str = "acao_br") -> dict:
    """Busca dados de um ativo no StatusInvest via API JSON interna.

    Args:
        ticker: Código do ativo sem .SA (ex: PETR4, HGLG11)
        asset_type: 'acao_br' ou 'fii'
    """
    ticker_clean = ticker.replace(".SA", "").upper()

    category = "acoes" if asset_type != "fii" else "fundos-imobiliarios"
    url = f"https://statusinvest.com.br/{category}/tickerprice"

    try:
        resp = requests.get(
            url,
            params={"ticker": ticker_clean, "type": "4" if asset_type == "fii" else "1"},
            headers=HEADERS,
            timeout=10,
        )
        if resp.status_code == 200:
            data = resp.json()
            if isinstance(data, list) and data:
                return _parse_statusinvest(data[0])
            elif isinstance(data, dict):
                return _parse_statusinvest(data)
    except Exception:
        pass

    return {}


def _parse_statusinvest(raw: dict) -> dict:
    """Converte dados do StatusInvest para formato padronizado."""
    result = {}
    mappings = {
        "price": "preco",
        "priceEarnings": "pl",
        "priceToBookValue": "pvp",
        "dividendYield": "dividend_yield",
        "earningsPerShare": "lpa",
        "bookValuePerShare": "vpa",
        "roe": "roe",
        "roic": "roic",
        "netMargin": "margem_liquida",
        "grossMargin": "margem_bruta",
        "payout": "payout",
        "evEbit": "ev_ebit",
        "evEbitda": "ev_ebitda",
    }

    for raw_key, clean_key in mappings.items():
        val = raw.get(raw_key)
        if val is not None:
            try:
                val = float(val)
                if clean_key in ("dividend_yield", "roe", "roic", "margem_liquida", "margem_bruta", "payout"):
                    val = val / 100
                result[clean_key] = val
            except (ValueError, TypeError):
                continue

    return result


@st.cache_data(ttl=3600, show_spinner=False)
def get_fii_dividends(ticker: str) -> pd.DataFrame:
    """Busca histórico de dividendos de FIIs no StatusInvest."""
    ticker_clean = ticker.replace(".SA", "").upper()
    url = f"https://statusinvest.com.br/fii/companytickerprovents"

    try:
        resp = requests.get(
            url,
            params={"ticker": ticker_clean, "chartProventsType": "2"},
            headers=HEADERS,
            timeout=10,
        )
        if resp.status_code == 200:
            data = resp.json()
            if isinstance(data, dict) and "assetEarningsModels" in data:
                items = data["assetEarningsModels"]
                if items:
                    df = pd.DataFrame(items)
                    if "ed" in df.columns and "v" in df.columns:
                        df["data"] = pd.to_datetime(df["ed"])
                        df["valor"] = pd.to_numeric(df["v"], errors="coerce")
                        return df[["data", "valor"]].dropna().set_index("data").sort_index()
    except Exception:
        pass
    return pd.DataFrame()


def check_statusinvest_status() -> bool:
    """Verifica se o StatusInvest está acessível."""
    try:
        resp = requests.get(
            f"{STATUSINVEST_BASE}/acoes/tickerprice",
            params={"ticker": "PETR4", "type": "1"},
            headers=HEADERS,
            timeout=5,
        )
        return resp.status_code == 200
    except Exception:
        return False

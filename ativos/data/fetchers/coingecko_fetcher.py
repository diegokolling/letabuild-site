"""Fetcher de dados suplementares de BTC via CoinGecko."""

import requests
import streamlit as st
from config.constants import COINGECKO_BASE


@st.cache_data(ttl=1800, show_spinner=False)
def get_btc_market_data() -> dict:
    """Busca dados de mercado do Bitcoin no CoinGecko."""
    url = f"{COINGECKO_BASE}/coins/bitcoin"
    params = {
        "localization": "false",
        "tickers": "false",
        "community_data": "false",
        "developer_data": "false",
    }
    try:
        resp = requests.get(url, params=params, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        market = data.get("market_data", {})
        return {
            "preco_usd": market.get("current_price", {}).get("usd"),
            "preco_brl": market.get("current_price", {}).get("brl"),
            "market_cap_usd": market.get("market_cap", {}).get("usd"),
            "volume_24h_usd": market.get("total_volume", {}).get("usd"),
            "variacao_24h": market.get("price_change_percentage_24h"),
            "variacao_7d": market.get("price_change_percentage_7d"),
            "variacao_30d": market.get("price_change_percentage_30d"),
            "variacao_1y": market.get("price_change_percentage_1y"),
            "ath_usd": market.get("ath", {}).get("usd"),
            "ath_date": market.get("ath_date", {}).get("usd"),
            "circulating_supply": market.get("circulating_supply"),
            "max_supply": market.get("max_supply"),
        }
    except Exception:
        return {}


@st.cache_data(ttl=1800, show_spinner=False)
def get_btc_price_history_cg(days: int = 365) -> dict:
    """Busca histórico de preço do BTC no CoinGecko (suplementar)."""
    url = f"{COINGECKO_BASE}/coins/bitcoin/market_chart"
    params = {"vs_currency": "usd", "days": days}
    try:
        resp = requests.get(url, params=params, timeout=15)
        resp.raise_for_status()
        return resp.json()
    except Exception:
        return {}


def check_coingecko_status() -> bool:
    """Verifica se a API do CoinGecko está respondendo."""
    try:
        resp = requests.get(f"{COINGECKO_BASE}/ping", timeout=5)
        return resp.status_code == 200
    except Exception:
        return False

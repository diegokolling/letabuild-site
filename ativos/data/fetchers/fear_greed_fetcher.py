"""Fetcher do Fear & Greed Index via Alternative.me."""

import requests
import streamlit as st
from config.constants import FEAR_GREED_URL


@st.cache_data(ttl=3600, show_spinner=False)
def get_fear_greed_index() -> dict:
    """Busca o Fear & Greed Index atual.

    Returns:
        Dict com value (0-100), classification, timestamp
    """
    try:
        resp = requests.get(FEAR_GREED_URL, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        if data.get("data"):
            item = data["data"][0]
            return {
                "value": int(item.get("value", 0)),
                "classification": item.get("value_classification", "N/A"),
                "timestamp": item.get("timestamp"),
            }
    except Exception:
        pass
    return {"value": None, "classification": "Indisponível", "timestamp": None}


def fear_greed_color(value: int) -> str:
    """Retorna cor CSS baseada no valor do Fear & Greed."""
    if value is None:
        return "#8B95A5"
    if value <= 25:
        return "#FF6B6B"  # Extreme Fear
    if value <= 45:
        return "#FF9F43"  # Fear
    if value <= 55:
        return "#FFD93D"  # Neutral
    if value <= 75:
        return "#96CEB4"  # Greed
    return "#00D4AA"      # Extreme Greed


def check_fear_greed_status() -> bool:
    """Verifica se a API do Fear & Greed está respondendo."""
    try:
        resp = requests.get(FEAR_GREED_URL, timeout=5)
        return resp.status_code == 200
    except Exception:
        return False

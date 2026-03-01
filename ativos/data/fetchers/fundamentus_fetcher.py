"""Fetcher de dados fundamentalistas via Fundamentus (ações BR)."""

import requests
import pandas as pd
import streamlit as st
from bs4 import BeautifulSoup


FUNDAMENTUS_URL = "https://www.fundamentus.com.br/detalhes.php"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
}


@st.cache_data(ttl=3600, show_spinner=False)
def get_fundamentus_data(ticker: str) -> dict:
    """Busca dados fundamentalistas de uma ação BR no Fundamentus.

    Args:
        ticker: Código do ativo sem .SA (ex: PETR4, VALE3)

    Returns:
        Dict com métricas fundamentalistas
    """
    ticker_clean = ticker.replace(".SA", "").upper()
    try:
        resp = requests.get(
            FUNDAMENTUS_URL,
            params={"papel": ticker_clean},
            headers=HEADERS,
            timeout=10,
        )
        resp.raise_for_status()
        resp.encoding = "utf-8"
        soup = BeautifulSoup(resp.text, "lxml")

        data = {}
        tables = soup.find_all("table", {"class": "w728"})

        for table in tables:
            rows = table.find_all("tr")
            for row in rows:
                cells = row.find_all("td")
                i = 0
                while i < len(cells) - 1:
                    label = cells[i].get_text(strip=True)
                    value = cells[i + 1].get_text(strip=True)
                    if label and value:
                        data[label] = value
                    i += 2

        return _parse_fundamentus(data) if data else {}
    except Exception:
        return {}


def _parse_fundamentus(raw: dict) -> dict:
    """Converte dados brutos do Fundamentus para formato estruturado."""
    def parse_number(val: str) -> float:
        if not val or val == "-":
            return None
        val = val.replace(".", "").replace(",", ".").replace("%", "").strip()
        try:
            return float(val)
        except (ValueError, TypeError):
            return None

    def parse_pct(val: str) -> float:
        n = parse_number(val)
        return n / 100 if n is not None else None

    result = {}

    mappings = {
        "Cotação": ("preco", parse_number),
        "P/L": ("pl", parse_number),
        "P/VP": ("pvp", parse_number),
        "Div.Yield": ("dividend_yield", parse_pct),
        "Div. Yield": ("dividend_yield", parse_pct),
        "LPA": ("lpa", parse_number),
        "VPA": ("vpa", parse_number),
        "Marg. Bruta": ("margem_bruta", parse_pct),
        "Marg. Líquida": ("margem_liquida", parse_pct),
        "ROIC": ("roic", parse_pct),
        "ROE": ("roe", parse_pct),
        "Patrim. Líq": ("patrimonio_liquido", parse_number),
        "Dív.Brut/ Patrim.": ("div_bruta_patrimonio", parse_number),
        "Payout": ("payout", parse_pct),
        "EV/EBIT": ("ev_ebit", parse_number),
        "EV/EBITDA": ("ev_ebitda", parse_number),
    }

    for raw_key, (clean_key, parser) in mappings.items():
        if raw_key in raw:
            val = parser(raw[raw_key])
            if val is not None:
                result[clean_key] = val

    return result


@st.cache_data(ttl=3600, show_spinner=False)
def get_fundamentus_list() -> pd.DataFrame:
    """Busca tabela resumo de todas as ações do Fundamentus."""
    try:
        url = "https://www.fundamentus.com.br/resultado.php"
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        resp.encoding = "utf-8"
        dfs = pd.read_html(resp.text, decimal=",", thousands=".")
        if dfs:
            return dfs[0]
    except Exception:
        pass
    return pd.DataFrame()


def check_fundamentus_status() -> bool:
    """Verifica se o Fundamentus está acessível."""
    try:
        resp = requests.get(
            FUNDAMENTUS_URL,
            params={"papel": "PETR4"},
            headers=HEADERS,
            timeout=5,
        )
        return resp.status_code == 200
    except Exception:
        return False

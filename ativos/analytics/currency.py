"""Conversor de moedas BRL/USD/BTC."""

import streamlit as st
from data.fetchers.bcb_fetcher import get_ptax
from data.fetchers.yfinance_fetcher import get_current_price


class CurrencyConverter:
    """Conversor de moeda usando PTAX (BCB) e preço BTC."""

    def __init__(self):
        self._ptax = None
        self._btc_price = None

    @property
    def ptax(self) -> float:
        """Cotação USD/BRL (PTAX)."""
        if self._ptax is None:
            self._ptax = get_ptax()
        return self._ptax

    @property
    def btc_price_usd(self) -> float:
        """Preço do BTC em USD."""
        if self._btc_price is None:
            self._btc_price = get_current_price("BTC-USD")
        return self._btc_price

    @property
    def btc_price_brl(self) -> float:
        """Preço do BTC em BRL."""
        return self.btc_price_usd * self.ptax

    def convert(self, value: float, from_currency: str, to_currency: str) -> float:
        """Converte valor entre moedas.

        Args:
            value: Valor a converter
            from_currency: Moeda de origem (BRL, USD, BTC)
            to_currency: Moeda de destino (BRL, USD, BTC)
        """
        if from_currency == to_currency:
            return value

        value_usd = self._to_usd(value, from_currency)
        return self._from_usd(value_usd, to_currency)

    def _to_usd(self, value: float, currency: str) -> float:
        if currency == "USD":
            return value
        elif currency == "BRL":
            return value / self.ptax if self.ptax else value
        elif currency == "BTC":
            return value * self.btc_price_usd if self.btc_price_usd else value
        return value

    def _from_usd(self, value_usd: float, currency: str) -> float:
        if currency == "USD":
            return value_usd
        elif currency == "BRL":
            return value_usd * self.ptax if self.ptax else value_usd
        elif currency == "BTC":
            return value_usd / self.btc_price_usd if self.btc_price_usd else value_usd
        return value_usd

    def format_value(self, value: float, currency: str) -> str:
        """Formata valor na moeda com símbolo."""
        if value is None:
            return "N/A"
        if currency == "BRL":
            return f"R$ {value:,.2f}"
        elif currency == "USD":
            return f"$ {value:,.2f}"
        elif currency == "BTC":
            if abs(value) >= 1:
                return f"₿ {value:,.4f}"
            elif abs(value) >= 0.001:
                return f"₿ {value:,.6f}"
            else:
                return f"{value * 1e8:,.0f} sats"
        return f"{value:,.2f}"

    def get_rates_summary(self) -> dict:
        """Retorna resumo das taxas atuais."""
        return {
            "USD/BRL (PTAX)": f"R$ {self.ptax:,.4f}",
            "BTC/USD": f"$ {self.btc_price_usd:,.2f}",
            "BTC/BRL": f"R$ {self.btc_price_brl:,.2f}",
        }


@st.cache_resource
def get_converter() -> CurrencyConverter:
    """Retorna instância singleton do conversor."""
    return CurrencyConverter()

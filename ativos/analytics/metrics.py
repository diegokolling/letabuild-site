"""Métricas de análise: retorno, volatilidade, Sharpe, drawdown, RSI, Mayer Multiple."""

import pandas as pd
import numpy as np


def total_return(prices: pd.Series) -> float:
    """Retorno total da série de preços."""
    if prices.empty or len(prices) < 2:
        return 0.0
    return (prices.iloc[-1] / prices.iloc[0]) - 1


def annualized_return(prices: pd.Series) -> float:
    """Retorno anualizado."""
    if prices.empty or len(prices) < 2:
        return 0.0
    total = total_return(prices)
    days = (prices.index[-1] - prices.index[0]).days
    if days <= 0:
        return 0.0
    years = days / 365.25
    if years < 0.01:
        return total
    if total <= -1:
        return -1.0
    return (1 + total) ** (1 / years) - 1


def period_return(prices: pd.Series, years: float) -> float:
    """Retorno no período de N anos, calculado do preço mais recente para trás."""
    if prices.empty or len(prices) < 2:
        return None
    end_date = prices.index[-1]
    start_date = end_date - pd.DateOffset(years=int(years))
    mask = prices.index >= start_date
    subset = prices[mask]
    if len(subset) < 2:
        return None
    return (subset.iloc[-1] / subset.iloc[0]) - 1


def volatility(prices: pd.Series, annualize: bool = True) -> float:
    """Volatilidade (desvio padrão dos retornos diários)."""
    if prices.empty or len(prices) < 10:
        return 0.0
    returns = prices.pct_change().dropna()
    vol = returns.std()
    if annualize:
        vol *= np.sqrt(252)
    return vol


def sharpe_ratio(prices: pd.Series, risk_free_annual: float = 0.0) -> float:
    """Sharpe Ratio anualizado."""
    if prices.empty or len(prices) < 10:
        return 0.0
    ret = annualized_return(prices)
    vol = volatility(prices)
    if vol == 0:
        return 0.0
    return (ret - risk_free_annual) / vol


def max_drawdown(prices: pd.Series) -> float:
    """Maximum Drawdown (valor negativo)."""
    if prices.empty or len(prices) < 2:
        return 0.0
    cummax = prices.cummax()
    drawdown = (prices - cummax) / cummax
    return drawdown.min()


def drawdown_series(prices: pd.Series) -> pd.Series:
    """Série temporal de drawdown."""
    if prices.empty:
        return pd.Series(dtype=float)
    cummax = prices.cummax()
    return (prices - cummax) / cummax


def rsi(prices: pd.Series, period: int = 14) -> float:
    """Relative Strength Index."""
    if prices.empty or len(prices) < period + 1:
        return None
    delta = prices.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)

    avg_gain = gain.rolling(window=period, min_periods=period).mean()
    avg_loss = loss.rolling(window=period, min_periods=period).mean()

    last_avg_gain = avg_gain.iloc[-1]
    last_avg_loss = avg_loss.iloc[-1]

    if last_avg_loss == 0:
        return 100.0
    rs = last_avg_gain / last_avg_loss
    return 100 - (100 / (1 + rs))


def rsi_series(prices: pd.Series, period: int = 14) -> pd.Series:
    """Série temporal do RSI."""
    if prices.empty or len(prices) < period + 1:
        return pd.Series(dtype=float)
    delta = prices.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)

    avg_gain = gain.rolling(window=period, min_periods=period).mean()
    avg_loss = loss.rolling(window=period, min_periods=period).mean()

    rs = avg_gain / avg_loss
    return 100 - (100 / (1 + rs))


def mayer_multiple(prices: pd.Series) -> float:
    """Mayer Multiple: preço atual / MM200 dias."""
    if prices.empty or len(prices) < 200:
        return None
    ma200 = prices.rolling(window=200).mean().iloc[-1]
    if ma200 == 0 or pd.isna(ma200):
        return None
    return prices.iloc[-1] / ma200


def moving_average(prices: pd.Series, window: int) -> pd.Series:
    """Média móvel simples."""
    return prices.rolling(window=window).mean()


def sma_200_weeks(prices: pd.Series) -> pd.Series:
    """Média móvel de 200 semanas (para BTC)."""
    if prices.empty:
        return pd.Series(dtype=float)
    weekly = prices.resample("W").last().dropna()
    return weekly.rolling(window=200).mean()


def normalize_base100(prices_dict: dict) -> pd.DataFrame:
    """Normaliza múltiplas séries na base 100 a partir da data comum mais recente.

    Args:
        prices_dict: {nome: pd.Series de preços}

    Returns:
        DataFrame com séries normalizadas
    """
    if not prices_dict:
        return pd.DataFrame()

    df = pd.DataFrame(prices_dict)
    df = df.dropna(how="all").ffill()

    first_valid = df.apply(lambda s: s.first_valid_index())
    common_start = first_valid.max()

    if common_start is None:
        return pd.DataFrame()

    df = df.loc[common_start:]
    first_row = df.iloc[0]
    first_row = first_row.replace(0, np.nan)
    normalized = df / first_row * 100

    return normalized

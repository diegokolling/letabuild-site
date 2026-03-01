"""Fábricas de gráficos Plotly com template dark mode."""

import plotly.graph_objects as go
import pandas as pd
from config.constants import COLORS


PLOTLY_LAYOUT = dict(
    template="plotly_dark",
    paper_bgcolor="#0E1117",
    plot_bgcolor="#0E1117",
    font=dict(family="Inter, sans-serif", color="#FAFAFA", size=12),
    margin=dict(l=20, r=20, t=40, b=20),
    xaxis=dict(
        gridcolor="#1E2533",
        zerolinecolor="#1E2533",
        showgrid=True,
        gridwidth=1,
    ),
    yaxis=dict(
        gridcolor="#1E2533",
        zerolinecolor="#1E2533",
        showgrid=True,
        gridwidth=1,
    ),
    hoverlabel=dict(
        bgcolor="#1A1F2E",
        bordercolor="#2A3040",
        font=dict(size=12, color="#FAFAFA"),
    ),
)

DEFAULT_LEGEND = dict(
    bgcolor="rgba(0,0,0,0)",
    bordercolor="rgba(0,0,0,0)",
    font=dict(size=11),
)

HORIZONTAL_LEGEND = dict(
    bgcolor="rgba(0,0,0,0)",
    bordercolor="rgba(0,0,0,0)",
    font=dict(size=11),
    orientation="h",
    yanchor="bottom",
    y=1.02,
    xanchor="right",
    x=1,
)


def multi_line_chart(
    data: pd.DataFrame,
    title: str = "",
    y_label: str = "",
    colors: list = None,
) -> go.Figure:
    """Gráfico de múltiplas linhas (comparação normalizada)."""
    colors = colors or COLORS["chart_colors"]
    fig = go.Figure()

    for i, col in enumerate(data.columns):
        fig.add_trace(go.Scatter(
            x=data.index,
            y=data[col],
            mode="lines",
            name=col,
            line=dict(color=colors[i % len(colors)], width=2),
            hovertemplate=f"{col}<br>%{{x|%d/%m/%Y}}<br>%{{y:,.2f}}<extra></extra>",
        ))

    fig.update_layout(
        **PLOTLY_LAYOUT,
        legend=HORIZONTAL_LEGEND,
        title=dict(text=title, font=dict(size=14)),
        yaxis_title=y_label,
        height=450,
    )
    return fig


def price_chart_with_ma(
    prices: pd.Series,
    ma_series: pd.Series = None,
    title: str = "",
    ma_label: str = "MM 200",
) -> go.Figure:
    """Gráfico de preço com média móvel sobreposta."""
    fig = go.Figure()

    fig.add_trace(go.Scatter(
        x=prices.index,
        y=prices.values,
        mode="lines",
        name="Preço",
        line=dict(color=COLORS["primary"], width=2),
        hovertemplate="%{x|%d/%m/%Y}<br>%{y:,.2f}<extra></extra>",
    ))

    if ma_series is not None and not ma_series.empty:
        fig.add_trace(go.Scatter(
            x=ma_series.index,
            y=ma_series.values,
            mode="lines",
            name=ma_label,
            line=dict(color=COLORS["warning"], width=1.5, dash="dash"),
            hovertemplate=f"{ma_label}<br>%{{x|%d/%m/%Y}}<br>%{{y:,.2f}}<extra></extra>",
        ))

    fig.update_layout(
        **PLOTLY_LAYOUT,
        legend=HORIZONTAL_LEGEND,
        title=dict(text=title, font=dict(size=14)),
        height=450,
    )
    return fig


def bar_chart(
    x: list,
    y: list,
    title: str = "",
    color: str = None,
    horizontal: bool = False,
) -> go.Figure:
    """Gráfico de barras simples."""
    color = color or COLORS["primary"]

    if horizontal:
        fig = go.Figure(go.Bar(
            y=x, x=y,
            orientation="h",
            marker_color=color,
            hovertemplate="%{y}<br>%{x:,.2f}<extra></extra>",
        ))
    else:
        fig = go.Figure(go.Bar(
            x=x, y=y,
            marker_color=color,
            hovertemplate="%{x}<br>%{y:,.2f}<extra></extra>",
        ))

    fig.update_layout(
        **PLOTLY_LAYOUT,
        legend=DEFAULT_LEGEND,
        title=dict(text=title, font=dict(size=14)),
        height=350,
    )
    return fig


def dividend_chart(dividends: pd.Series, title: str = "Dividendos") -> go.Figure:
    """Gráfico de barras de dividendos mensais."""
    if dividends.empty:
        return go.Figure().update_layout(**PLOTLY_LAYOUT, title="Sem dados de dividendos")

    monthly = dividends.resample("M").sum()

    fig = go.Figure(go.Bar(
        x=monthly.index,
        y=monthly.values,
        marker_color=COLORS["primary"],
        hovertemplate="%{x|%b/%Y}<br>R$ %{y:,.2f}<extra></extra>",
    ))

    fig.update_layout(
        **PLOTLY_LAYOUT,
        legend=DEFAULT_LEGEND,
        title=dict(text=title, font=dict(size=14)),
        height=350,
        xaxis_title="Mês",
        yaxis_title="Valor",
    )
    return fig


def gauge_chart(value: float, title: str = "", max_val: float = 100) -> go.Figure:
    """Gauge chart (para Fear & Greed, RSI, etc)."""
    if value is None:
        value = 0

    if value <= 25:
        bar_color = COLORS["red"]
    elif value <= 45:
        bar_color = COLORS["orange"]
    elif value <= 55:
        bar_color = COLORS["warning"]
    elif value <= 75:
        bar_color = "#96CEB4"
    else:
        bar_color = COLORS["green"]

    fig = go.Figure(go.Indicator(
        mode="gauge+number",
        value=value,
        title=dict(text=title, font=dict(size=13, color="#FAFAFA")),
        number=dict(font=dict(size=28, color="#FAFAFA")),
        gauge=dict(
            axis=dict(range=[0, max_val], tickcolor="#8B95A5"),
            bar=dict(color=bar_color, thickness=0.3),
            bgcolor="#1A1F2E",
            borderwidth=0,
            steps=[
                dict(range=[0, 25], color="rgba(255,107,107,0.15)"),
                dict(range=[25, 45], color="rgba(255,159,67,0.15)"),
                dict(range=[45, 55], color="rgba(255,217,61,0.15)"),
                dict(range=[55, 75], color="rgba(150,206,180,0.15)"),
                dict(range=[75, 100], color="rgba(0,212,170,0.15)"),
            ],
        ),
    ))

    fig.update_layout(**PLOTLY_LAYOUT, legend=DEFAULT_LEGEND, height=250)
    fig.update_layout(margin=dict(l=30, r=30, t=50, b=10))
    return fig

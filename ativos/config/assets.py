"""Listas de ativos pré-carregados por categoria."""

ASSET_CATEGORIES = {
    "Cripto": ["BTC"],
    "Mag7": ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA"],
    "Brasil": ["PETR4", "VALE3", "ITUB4", "BBDC4", "BBAS3", "WEGE3", "ABEV3", "ELET3", "SUZB3"],
    "Commodities": ["Ouro", "Prata", "Urânio", "Petróleo"],
    "Índices": ["Ibovespa", "S&P 500", "QQQ", "VIX"],
}

ALL_PRELOADED = []
for assets in ASSET_CATEGORIES.values():
    for a in assets:
        if a not in ALL_PRELOADED:
            ALL_PRELOADED.append(a)

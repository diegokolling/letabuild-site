"""Mapeamento de nomes amigáveis para tickers yfinance, tipo e moeda nativa."""

ASSET_REGISTRY = {
    # Mag7
    "AAPL": {"ticker": "AAPL", "nome": "Apple", "tipo": "acao_us", "moeda": "USD"},
    "MSFT": {"ticker": "MSFT", "nome": "Microsoft", "tipo": "acao_us", "moeda": "USD"},
    "GOOGL": {"ticker": "GOOGL", "nome": "Alphabet", "tipo": "acao_us", "moeda": "USD"},
    "AMZN": {"ticker": "AMZN", "nome": "Amazon", "tipo": "acao_us", "moeda": "USD"},
    "NVDA": {"ticker": "NVDA", "nome": "NVIDIA", "tipo": "acao_us", "moeda": "USD"},
    "META": {"ticker": "META", "nome": "Meta", "tipo": "acao_us", "moeda": "USD"},
    "TSLA": {"ticker": "TSLA", "nome": "Tesla", "tipo": "acao_us", "moeda": "USD"},
    # US Extras
    "PLTR": {"ticker": "PLTR", "nome": "Palantir", "tipo": "acao_us", "moeda": "USD"},
    "AVGO": {"ticker": "AVGO", "nome": "Broadcom", "tipo": "acao_us", "moeda": "USD"},
    "AMD": {"ticker": "AMD", "nome": "AMD", "tipo": "acao_us", "moeda": "USD"},
    "JNJ": {"ticker": "JNJ", "nome": "Johnson & Johnson", "tipo": "acao_us", "moeda": "USD"},
    "KO": {"ticker": "KO", "nome": "Coca-Cola", "tipo": "acao_us", "moeda": "USD"},
    "JPM": {"ticker": "JPM", "nome": "JPMorgan", "tipo": "acao_us", "moeda": "USD"},
    "BRK-B": {"ticker": "BRK-B", "nome": "Berkshire Hathaway", "tipo": "acao_us", "moeda": "USD"},
    "XOM": {"ticker": "XOM", "nome": "ExxonMobil", "tipo": "acao_us", "moeda": "USD"},
    "COIN": {"ticker": "COIN", "nome": "Coinbase", "tipo": "acao_us", "moeda": "USD"},
    "XYZ": {"ticker": "XYZ", "nome": "Block (ex-Square)", "tipo": "acao_us", "moeda": "USD"},
    "MSTR": {"ticker": "MSTR", "nome": "Strategy (MicroStrategy)", "tipo": "acao_us", "moeda": "USD"},
    # Brasil (Top 10 market cap)
    "PETR4": {"ticker": "PETR4.SA", "nome": "Petrobras PN", "tipo": "acao_br", "moeda": "BRL"},
    "VALE3": {"ticker": "VALE3.SA", "nome": "Vale ON", "tipo": "acao_br", "moeda": "BRL"},
    "ITUB4": {"ticker": "ITUB4.SA", "nome": "Itaú Unibanco PN", "tipo": "acao_br", "moeda": "BRL"},
    "BBDC4": {"ticker": "BBDC4.SA", "nome": "Bradesco PN", "tipo": "acao_br", "moeda": "BRL"},
    "BBAS3": {"ticker": "BBAS3.SA", "nome": "Banco do Brasil ON", "tipo": "acao_br", "moeda": "BRL"},
    "WEGE3": {"ticker": "WEGE3.SA", "nome": "WEG ON", "tipo": "acao_br", "moeda": "BRL"},
    "ABEV3": {"ticker": "ABEV3.SA", "nome": "Ambev ON", "tipo": "acao_br", "moeda": "BRL"},
    "ELET3": {"ticker": "ELET3.SA", "nome": "Eletrobras ON", "tipo": "acao_br", "moeda": "BRL"},
    "SUZB3": {"ticker": "SUZB3.SA", "nome": "Suzano ON", "tipo": "acao_br", "moeda": "BRL"},
    "RENT3": {"ticker": "RENT3.SA", "nome": "Localiza ON", "tipo": "acao_br", "moeda": "BRL"},
    # Brasil (outros)
    "EGIE3": {"ticker": "EGIE3.SA", "nome": "Engie Brasil ON", "tipo": "acao_br", "moeda": "BRL"},
    "CSMG3": {"ticker": "CSMG3.SA", "nome": "COPASA ON", "tipo": "acao_br", "moeda": "BRL"},
    "TAEE11": {"ticker": "TAEE11.SA", "nome": "Taesa Unit", "tipo": "acao_br", "moeda": "BRL"},
    # ETFs
    "QQQ": {"ticker": "QQQ", "nome": "Invesco QQQ (Nasdaq-100)", "tipo": "etf", "moeda": "USD"},
    "IGV": {"ticker": "IGV", "nome": "iShares North American Tech-Software", "tipo": "etf", "moeda": "USD"},
    # FIIs
    "HGLG11": {"ticker": "HGLG11.SA", "nome": "CSHG Logística FII", "tipo": "fii", "moeda": "BRL"},
    # Cripto
    "BTC": {"ticker": "BTC-USD", "nome": "Bitcoin", "tipo": "cripto", "moeda": "USD"},
    # Commodities
    "Ouro": {"ticker": "GC=F", "nome": "Ouro (USD/oz)", "tipo": "commodity", "moeda": "USD"},
    "Prata": {"ticker": "SI=F", "nome": "Prata (USD/oz)", "tipo": "commodity", "moeda": "USD"},
    "Urânio": {"ticker": "URA", "nome": "Urânio (Global X Uranium ETF)", "tipo": "etf", "moeda": "USD"},
    "Petróleo": {"ticker": "CL=F", "nome": "Petróleo WTI (USD/barril)", "tipo": "commodity", "moeda": "USD"},
    # Benchmarks
    "Ibovespa": {"ticker": "^BVSP", "nome": "Ibovespa", "tipo": "benchmark", "moeda": "BRL"},
    "S&P 500": {"ticker": "^GSPC", "nome": "S&P 500", "tipo": "benchmark", "moeda": "USD"},
    "VIX": {"ticker": "^VIX", "nome": "VIX (Índice de Volatilidade)", "tipo": "benchmark", "moeda": "USD"},
    "CDI": {"ticker": None, "nome": "CDI", "tipo": "benchmark_bcb", "moeda": "BRL"},
    "IPCA": {"ticker": None, "nome": "IPCA", "tipo": "benchmark_bcb", "moeda": "BRL"},
}


_REGISTRY_UPPER = {k.upper(): v for k, v in ASSET_REGISTRY.items()}


def get_asset_info(asset_name: str) -> dict:
    """Retorna info do ativo. Tenta registro, senão infere do nome."""
    if asset_name in ASSET_REGISTRY:
        return ASSET_REGISTRY[asset_name]

    name_upper = asset_name.upper().strip()

    if name_upper in _REGISTRY_UPPER:
        return _REGISTRY_UPPER[name_upper]

    if name_upper.endswith(".SA"):
        code = name_upper.replace(".SA", "")
        if code[-2:].isdigit() and int(code[-2:]) >= 11:
            tipo = "fii"
        else:
            tipo = "acao_br"
        return {"ticker": name_upper, "nome": asset_name, "tipo": tipo, "moeda": "BRL"}

    if name_upper.endswith("11") and len(name_upper) >= 5:
        return {"ticker": f"{name_upper}.SA", "nome": asset_name, "tipo": "fii", "moeda": "BRL"}

    if any(c.isdigit() for c in name_upper) and len(name_upper) <= 6:
        return {"ticker": f"{name_upper}.SA", "nome": asset_name, "tipo": "acao_br", "moeda": "BRL"}

    return {"ticker": name_upper, "nome": asset_name, "tipo": "acao_us", "moeda": "USD"}


def get_all_asset_names() -> list:
    """Retorna todos os nomes de ativos registrados."""
    return list(ASSET_REGISTRY.keys())

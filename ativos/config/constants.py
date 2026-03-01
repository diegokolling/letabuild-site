"""Cores, URLs, códigos SGS do BCB, regras fiscais."""

# Cores do tema
COLORS = {
    "primary": "#00D4AA",
    "secondary": "#6C63FF",
    "accent": "#FF6B6B",
    "warning": "#FFD93D",
    "bg_dark": "#0E1117",
    "bg_card": "#1A1F2E",
    "bg_card_hover": "#232940",
    "text": "#FAFAFA",
    "text_muted": "#8B95A5",
    "green": "#00D4AA",
    "red": "#FF6B6B",
    "blue": "#6C63FF",
    "yellow": "#FFD93D",
    "orange": "#FF9F43",
    "chart_colors": ["#00D4AA", "#6C63FF", "#FF6B6B", "#FFD93D", "#FF9F43", "#45B7D1", "#96CEB4", "#FFEAA7"],
}

# BCB SGS series codes
BCB_SGS = {
    "CDI": 12,
    "IPCA": 433,
    "SELIC": 432,
    "PTAX_COMPRA": 10813,
    "PTAX_VENDA": 10814,
}

# BCB API
BCB_SGS_URL = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.{code}/dados?formato=json"
BCB_PTAX_URL = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='{date}'&$format=json"

# CoinGecko
COINGECKO_BASE = "https://api.coingecko.com/api/v3"

# Alternative.me Fear & Greed
FEAR_GREED_URL = "https://api.alternative.me/fng/?limit=1"

# Cache TTLs (em segundos)
CACHE_TTL = {
    "prices": 3600,          # 1 hora
    "fundamentals": 3600,    # 1 hora
    "btc_price": 300,        # 5 min
    "coingecko": 1800,       # 30 min
    "bcb": 86400,            # 24 horas
    "ptax": 3600,            # 1 hora
    "fear_greed": 3600,      # 1 hora
}

# Regras tributárias BR
TAX_RULES = {
    "acoes_br": {
        "descricao": "Ações Brasil",
        "isencao_mensal": 20000,
        "aliquota_ganho": 0.15,
        "aliquota_daytrade": 0.20,
        "nota": "Vendas até R$20k/mês isentas de IR sobre ganho de capital",
    },
    "cripto": {
        "descricao": "Criptomoedas",
        "isencao_mensal": 35000,
        "aliquota_ganho": 0.15,
        "nota": "Vendas até R$35k/mês isentas de IR sobre ganho de capital",
    },
    "fiis": {
        "descricao": "Fundos Imobiliários",
        "dividendos_isentos": True,
        "aliquota_ganho": 0.20,
        "nota": "Dividendos isentos de IR. Ganho de capital: 20%",
    },
    "renda_fixa": {
        "descricao": "Renda Fixa",
        "tabela_regressiva": {
            "ate_180": 0.225,
            "181_360": 0.20,
            "361_720": 0.175,
            "acima_720": 0.15,
        },
        "nota": "Tabela regressiva: 22,5% (até 180d) a 15% (acima de 720d)",
    },
}

# Moedas
CURRENCIES = ["BRL", "USD", "BTC"]
DEFAULT_CURRENCY = "BRL"

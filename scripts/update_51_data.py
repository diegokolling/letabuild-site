#!/usr/bin/env python3
"""
update_51_data.py

Atualiza dados da rede Bitcoin para o Simulador de Ataque 51%.
Executado diariamente via GitHub Actions.

Dados:
  - hashrate_eh   : Hashrate da rede em EH/s  — blockchain.info
  - difficulty_t   : Dificuldade em trilhões    — blockchain.info
  - btc_price_usd  : Preço do BTC em USD       — CoinGecko
"""

import json
import sys
import urllib.request
from datetime import date

JSON_PATH = "51/data/network.json"

HEADERS = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (compatible; letabuild-updater/1.0)",
}


def fetch_url(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8")


def fetch_hashrate():
    """Hashrate from blockchain.info in EH/s."""
    print("  Buscando hashrate...")
    # Returns hashrate in GH/s as a single number
    raw = fetch_url("https://blockchain.info/q/hashrate")
    gh_s = float(raw.strip())
    eh_s = round(gh_s / 1e9, 1)  # GH/s -> EH/s
    print(f"    -> {eh_s} EH/s")
    return eh_s


def fetch_difficulty():
    """Difficulty from blockchain.info in trillions."""
    print("  Buscando dificuldade...")
    raw = fetch_url("https://blockchain.info/q/getdifficulty")
    diff = float(raw.strip())
    diff_t = round(diff / 1e12, 1)  # -> trillions
    print(f"    -> {diff_t} T")
    return diff_t


def fetch_btc_price():
    """BTC price in USD from CoinGecko."""
    print("  Buscando preço BTC...")
    url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    data = json.loads(fetch_url(url))
    price = int(data["bitcoin"]["usd"])
    print(f"    -> ${price:,}")
    return price


def main():
    print(f"=== Atualização Simulador 51% — {date.today().isoformat()} ===\n")

    errors = []
    result = {}

    try:
        result["hashrate_eh"] = fetch_hashrate()
    except Exception as e:
        print(f"  ✗ Erro hashrate: {e}")
        errors.append(f"hashrate: {e}")

    try:
        result["difficulty_t"] = fetch_difficulty()
    except Exception as e:
        print(f"  ✗ Erro difficulty: {e}")
        errors.append(f"difficulty: {e}")

    try:
        result["btc_price_usd"] = fetch_btc_price()
    except Exception as e:
        print(f"  ✗ Erro BTC price: {e}")
        errors.append(f"btc_price: {e}")

    if errors:
        print(f"\n⚠ {len(errors)} erro(s). Abortando.")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)

    result["last_updated"] = date.today().isoformat()

    print(f"\nSalvando em {JSON_PATH}...")
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print("✓ Concluído.")


if __name__ == "__main__":
    main()

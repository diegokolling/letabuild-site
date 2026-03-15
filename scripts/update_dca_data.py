#!/usr/bin/env python3
"""
update_dca_data.py

Atualiza os dados estáticos do Simulador DCA (letabuild.com/dca/).
Executado mensalmente via GitHub Actions.

Dados atualizados:
  - SP500_DATA   : S&P 500 (^GSPC)      — Yahoo Finance
  - QQQ_DATA     : QQQ (Nasdaq-100)      — Yahoo Finance
  - GLD_DATA     : Ouro via GLD ETF      — Yahoo Finance
  - IBOV_DATA    : Ibovespa (^BVSP)      — Yahoo Finance
  - PTAX_DATA    : USD/BRL mensal        — Yahoo Finance (BRL=X) + BCB fallback
  - POUPANCA_RATE: taxa mensal poupança  — BCB série 432 (Selic meta)
"""

import json
import re
import ssl
import sys
import urllib.request
from datetime import date, datetime

import yfinance as yf


# ─── CONFIG ──────────────────────────────────────────────────────────────────

HTML_PATH  = "dca/index.html"
DATA_START = "1999-01-01"

YFINANCE_TICKERS = {
    "SP500_DATA": "^GSPC",
    "QQQ_DATA":   "QQQ",
    "GLD_DATA":   "GLD",
    "IBOV_DATA":  "^BVSP",
}

BCB_HEADERS = {
    "Accept":     "application/json",
    "User-Agent": "Mozilla/5.0 (compatible; letabuild-updater/1.0)",
}


def _bcb_ssl_context() -> ssl.SSLContext:
    """Contexto SSL para APIs do BCB — tenta certifi, senão usa bundle do sistema."""
    try:
        import certifi
        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        return ctx


# ─── FETCHERS ────────────────────────────────────────────────────────────────

def fetch_yfinance(ticker: str, start: str = DATA_START) -> dict:
    """Preços mensais de fechamento via yfinance (último fechamento de cada mês)."""
    print(f"  Buscando {ticker}...")
    df = yf.download(ticker, start=start, interval="1mo", progress=False, auto_adjust=True)
    if df.empty:
        raise ValueError(f"Nenhum dado retornado para {ticker}")

    # yfinance às vezes retorna MultiIndex
    if hasattr(df.columns, "levels"):
        df.columns = df.columns.droplevel(1)

    result = {}
    for idx, row in df.iterrows():
        key   = idx.strftime("%Y-%m")
        close = float(row["Close"]) if "Close" in row else None
        if close and close > 0:
            result[key] = round(close, 4)

    print(f"    → {len(result)} meses ({min(result)} a {max(result)})")
    return result


def fetch_ptax_yfinance() -> dict:
    """
    Taxa USD/BRL mensal via Yahoo Finance (ticker BRL=X).
    BRL=X = preço de 1 USD em BRL (equivalente ao PTAX de venda).
    Dados disponíveis desde ~2003; meses anteriores vêm do HTML existente.
    """
    print("  Buscando PTAX via Yahoo Finance (BRL=X)...")
    df = yf.download("BRL=X", start=DATA_START, interval="1mo", progress=False, auto_adjust=True)
    if df.empty:
        raise ValueError("Nenhum dado BRL=X retornado")

    if hasattr(df.columns, "levels"):
        df.columns = df.columns.droplevel(1)

    result = {}
    for idx, row in df.iterrows():
        key   = idx.strftime("%Y-%m")
        close = float(row["Close"]) if "Close" in row else None
        if close and close > 0:
            result[key] = round(close, 4)

    print(f"    → {len(result)} meses ({min(result)} a {max(result)})")
    return result


def fetch_ptax_bcb() -> dict:
    """
    Taxa USD/BRL mensal via BCB PTAX API (fallback).
    Usa urllib para evitar problemas de encoding do requests.
    """
    print("  Buscando PTAX via BCB (fallback)...")
    today = date.today().strftime("%m-%d-%Y")
    url = (
        "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/"
        "CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinal=@dataFinal)"
        f"?@dataInicial='01-01-1999'&@dataFinal='{today}'"
        "&$filter=tipoBoletim eq 'Fechamento'"
        "&$format=json"
        "&$select=cotacaoVenda,dataHoraCotacao"
        "&$top=100000"
    )
    req  = urllib.request.Request(url, headers=BCB_HEADERS)
    with urllib.request.urlopen(req, timeout=30, context=_bcb_ssl_context()) as resp:
        rows = json.loads(resp.read())["value"]

    monthly = {}
    for item in rows:
        key  = item["dataHoraCotacao"][:7]
        monthly[key] = round(float(item["cotacaoVenda"]), 4)

    print(f"    → {len(monthly)} meses ({min(monthly)} a {max(monthly)})")
    return monthly


def fetch_ptax() -> dict:
    """Tenta Yahoo Finance primeiro; cai para BCB se falhar."""
    try:
        return fetch_ptax_yfinance()
    except Exception as e1:
        print(f"    Yahoo Finance falhou ({e1}), tentando BCB...")
        return fetch_ptax_bcb()


def fetch_selic_monthly() -> dict:
    """
    Selic meta mensal (último valor de cada mês) via BCB série 432.
    Busca em blocos de 5 anos para evitar erro 406 por resposta muito grande.
    """
    print("  Buscando Selic meta (BCB série 432)...")
    base_url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json"
    cur_year = date.today().year
    all_rows = []

    for year_start in range(1999, cur_year + 1, 5):
        year_end = min(year_start + 4, cur_year)
        url = f"{base_url}&dataInicial=01/01/{year_start}&dataFinal=31/12/{year_end}"
        req = urllib.request.Request(url, headers=BCB_HEADERS)
        with urllib.request.urlopen(req, timeout=30, context=_bcb_ssl_context()) as resp:
            all_rows.extend(json.loads(resp.read()))

    monthly = {}
    for item in all_rows:
        dt  = datetime.strptime(item["data"], "%d/%m/%Y")
        key = dt.strftime("%Y-%m")
        monthly[key] = float(item["valor"])   # sobreescreve → fica o último do mês

    print(f"    → {len(monthly)} meses ({min(monthly)} a {max(monthly)})")
    return monthly


def build_poupanca_rate(selic_monthly: dict) -> dict:
    """
    Converte Selic meta mensal em taxa mensal da poupança.
    Regra vigente desde mai/2012:
      Selic > 8,5% a.a.  →  0,5% a.m.
      Selic ≤ 8,5% a.a.  →  70% × (Selic / 12 / 100)
    TR ignorada (≈ 0% desde 2017).
    """
    result = {}
    for key, selic in sorted(selic_monthly.items()):
        if selic > 8.5:
            result[key] = 0.005
        else:
            result[key] = round(0.7 * selic / 1200, 6)
    return result


# ─── HTML UPDATE ─────────────────────────────────────────────────────────────

def merge_with_existing(html_content: str, const_name: str, new_data: dict) -> dict:
    """
    Extrai o valor atual de uma constante JS do HTML e faz merge com novos dados.
    Útil para PTAX_DATA: preserva valores antigos do BCB que o Yahoo não cobre.
    """
    pattern = rf'const {re.escape(const_name)} = (\{{[^;]*?\}});'
    match   = re.search(pattern, html_content, flags=re.DOTALL)
    if not match:
        return new_data
    try:
        existing = json.loads(match.group(1))
        merged   = {**existing, **new_data}   # novos dados sobrescrevem antigos
        return merged
    except Exception:
        return new_data


def update_js_const(content: str, const_name: str, data: dict) -> str:
    """Substitui o valor de uma constante JS por novo JSON."""
    json_str = json.dumps(data, separators=(",", ":"), ensure_ascii=False)
    pattern  = rf'(const {re.escape(const_name)} = )\{{[^;]*?\}};'
    new_val  = rf'\g<1>{json_str};'
    updated, n = re.subn(pattern, new_val, content, flags=re.DOTALL)
    if n == 0:
        raise ValueError(f"Constante '{const_name}' não encontrada no HTML.")
    return updated


def update_html(updates: dict, merge_keys: set = None):
    """Lê o HTML, atualiza todas as constantes e salva."""
    print(f"\nAtualizando {HTML_PATH}...")
    with open(HTML_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    for const_name, data in updates.items():
        if merge_keys and const_name in merge_keys:
            data = merge_with_existing(content, const_name, data)
        content = update_js_const(content, const_name, data)
        print(f"  ✓ {const_name} ({len(data)} entradas, {min(data)} → {max(data)})")

    with open(HTML_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    print("  HTML salvo.")


# ─── MAIN ────────────────────────────────────────────────────────────────────

def main():
    print(f"=== Atualização DCA — {date.today().isoformat()} ===\n")
    print("Buscando dados de mercado...")

    errors  = []
    updates = {}

    # Yahoo Finance (SP500, QQQ, GLD, IBOV)
    for const_name, ticker in YFINANCE_TICKERS.items():
        try:
            updates[const_name] = fetch_yfinance(ticker)
        except Exception as e:
            print(f"  ✗ Erro em {ticker}: {e}")
            errors.append(f"{ticker}: {e}")

    # PTAX (Yahoo Finance + BCB fallback)
    try:
        updates["PTAX_DATA"] = fetch_ptax()
    except Exception as e:
        print(f"  ✗ Erro PTAX: {e}")
        errors.append(f"PTAX: {e}")

    # Selic → Poupança
    try:
        selic = fetch_selic_monthly()
        updates["POUPANCA_RATE"] = build_poupanca_rate(selic)
    except Exception as e:
        print(f"  ✗ Erro Selic/Poupança: {e}")
        errors.append(f"Selic: {e}")

    if errors:
        print(f"\n⚠ {len(errors)} erro(s) durante o fetch. Abortando.")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)

    # PTAX: merge com dados históricos do HTML (Yahoo não cobre 1999-2003)
    update_html(updates, merge_keys={"PTAX_DATA"})
    print("\n✓ Concluído.")


if __name__ == "__main__":
    main()

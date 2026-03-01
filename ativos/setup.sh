#!/bin/bash
set -e

echo "================================================"
echo "  Portfolio Analyzer - Setup & Launch"
echo "================================================"
echo ""

cd "$(dirname "$0")"

if ! command -v python3 &> /dev/null; then
    echo "ERRO: Python 3 nao encontrado. Instale em https://python.org"
    exit 1
fi

if [ ! -d "venv" ]; then
    echo "[1/3] Criando ambiente virtual..."
    python3 -m venv venv
else
    echo "[1/3] Ambiente virtual ja existe."
fi

echo "[2/3] Instalando dependencias..."
source venv/bin/activate
pip install -q -r requirements.txt

echo "[3/3] Iniciando Portfolio Analyzer..."
echo ""
echo "  Acesse: http://localhost:8501"
echo "  Para parar: Ctrl+C"
echo ""
streamlit run app.py

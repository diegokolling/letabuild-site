# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Leta Build is a multi-tool personal finance and crypto education platform (letabuild.com). It consists of 9+ independent tools built with different tech stacks, unified under a shared homepage with common theme and language systems.

## Architecture

**Static apps** (vanilla JS, no build step): `conversor/`, `custodia/`, `dca/`, `quiz/`, `seed/`, `node/`, `habitos/`, `btc/`
**Streamlit apps** (Python): `ativos/` (port 8502)
**Shared modules**: `theme-toggle.js` (dark/light via `data-theme` on `<html>`), `lang-toggle.js` (PT-BR/EN via `data-pt`/`data-en` attributes)
**Deployment configs**: `deploy/` (Nginx reverse proxy, Supervisor process management, VPS setup)
**CI/CD**: `.github/workflows/` (daily DCA data updates, Supabase keepalive)

Each app is self-contained in its own directory with its own HTML/JS/CSS. There is no shared build system or package manager for the frontend apps.

## Running the Streamlit App (ativos)

```bash
cd ativos
pip install -r requirements.txt
streamlit run app.py --server.port 8502
```

## Running the DCA Data Update Script

```bash
pip install yfinance requests
python scripts/update_dca_data.py
```

## Key Patterns

- **Frontend apps** use IIFEs to avoid global scope pollution, with a `$()` shorthand for `getElementById`
- **Multi-screen SPAs** (custodia, quiz) toggle screens via `.active` CSS class and a `showScreen(name)` function
- **Bilingual support**: All user-facing text uses `data-pt` and `data-en` HTML attributes; JS listens for `langchange` custom events
- **Data persistence**: LocalStorage for client-side state (custodia progress, habitos); Supabase for cloud-synced data (habitos)
- **API calls**: CoinGecko (crypto prices, 10s throttle), yfinance (stocks), BCB (Brazilian rates), StatusInvest/Fundamentus (Brazilian fundamentals)

## Design System

- Primary color: orange (`#e08a3a` / `#f7931a`)
- Dark theme background: `#0a0a0a` → `#241e16` (hover)
- Light theme background: `#f6f9fb` → `#ffffff`
- Accent colors: green `#3fb950`, red `#f85149`, blue `#58a6ff`

## Production Infrastructure

- **Nginx** reverse proxies static files and Streamlit apps (behind Cloudflare SSL)
- **Supervisor** manages Streamlit processes with auto-restart
- **Supabase** (PostgreSQL) backs the habits tracker with row-level security
- Subdomains: `ativos.letabuild.com` (8502), `video.letabuild.com` (8501), `paper.letabuild.com` (8503)

## Language

The codebase and UI content are bilingual (Portuguese and English). Comments and variable names are primarily in Portuguese.

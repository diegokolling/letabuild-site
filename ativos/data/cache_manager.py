"""Cache helpers com TTL usando st.cache_data do Streamlit."""

import streamlit as st
import hashlib


def cache_key(*args) -> str:
    """Gera chave de cache a partir dos argumentos."""
    raw = "|".join(str(a) for a in args)
    return hashlib.md5(raw.encode()).hexdigest()


def get_cached(key: str) -> object:
    """Busca valor do session_state cache."""
    if key in st.session_state:
        return st.session_state[key]
    return None


def set_cached(key: str, value: object):
    """Salva valor no session_state cache."""
    st.session_state[key] = value


def clear_all_cache():
    """Limpa todo o cache do Streamlit."""
    st.cache_data.clear()
    keys_to_remove = [k for k in st.session_state.keys() if k.startswith("cache_")]
    for k in keys_to_remove:
        del st.session_state[k]

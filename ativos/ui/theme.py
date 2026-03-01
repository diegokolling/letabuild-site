"""CSS custom dark mode para o Portfolio Analyzer."""

CUSTOM_CSS = """
<style>
    /* Remove Streamlit default padding */
    .block-container {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    /* Sidebar */
    [data-testid="stSidebar"] {
        background-color: #0D1117;
        border-right: 1px solid #1E2533;
    }

    [data-testid="stSidebar"] .stMarkdown h1 {
        color: #00D4AA;
        font-size: 1.4rem;
        font-weight: 700;
        letter-spacing: -0.5px;
    }

    /* Metric cards */
    .metric-card {
        background: linear-gradient(135deg, #1A1F2E 0%, #1E2538 100%);
        border: 1px solid #2A3040;
        border-radius: 12px;
        padding: 1.2rem;
        margin-bottom: 0.8rem;
        transition: border-color 0.2s;
    }

    .metric-card:hover {
        border-color: #00D4AA;
    }

    .metric-label {
        color: #8B95A5;
        font-size: 0.78rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.3rem;
    }

    .metric-value {
        color: #FAFAFA;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.2;
    }

    .metric-value.positive {
        color: #00D4AA;
    }

    .metric-value.negative {
        color: #FF6B6B;
    }

    .metric-delta {
        font-size: 0.8rem;
        margin-top: 0.2rem;
    }

    /* Section headers */
    .section-header {
        color: #FAFAFA;
        font-size: 1.1rem;
        font-weight: 600;
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
        border-bottom: 2px solid #00D4AA;
        display: inline-block;
    }

    /* Info box */
    .info-box {
        background: #1A1F2E;
        border-left: 3px solid #6C63FF;
        border-radius: 0 8px 8px 0;
        padding: 0.8rem 1rem;
        margin: 0.8rem 0;
        color: #8B95A5;
        font-size: 0.85rem;
    }

    /* Warning box */
    .warning-box {
        background: #1A1F2E;
        border-left: 3px solid #FFD93D;
        border-radius: 0 8px 8px 0;
        padding: 0.8rem 1rem;
        margin: 0.8rem 0;
        color: #8B95A5;
        font-size: 0.85rem;
    }

    /* Custom table */
    .dataframe {
        border: none !important;
    }

    .dataframe th {
        background-color: #1A1F2E !important;
        color: #8B95A5 !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        font-size: 0.75rem !important;
        letter-spacing: 0.5px !important;
        border-bottom: 2px solid #2A3040 !important;
    }

    .dataframe td {
        background-color: #0E1117 !important;
        color: #FAFAFA !important;
        border-bottom: 1px solid #1A1F2E !important;
    }

    /* Tabs */
    .stTabs [data-baseweb="tab-list"] {
        gap: 2px;
        background-color: #1A1F2E;
        border-radius: 10px;
        padding: 4px;
    }

    .stTabs [data-baseweb="tab"] {
        border-radius: 8px;
        color: #8B95A5;
        font-weight: 500;
    }

    .stTabs [aria-selected="true"] {
        background-color: #00D4AA !important;
        color: #0E1117 !important;
    }

    /* Selectbox */
    [data-baseweb="select"] {
        border-radius: 8px;
    }

    /* Buttons */
    .stButton > button {
        border-radius: 8px;
        font-weight: 600;
        border: 1px solid #2A3040;
        transition: all 0.2s;
    }

    .stButton > button:hover {
        border-color: #00D4AA;
        color: #00D4AA;
    }

    /* Number input */
    .stNumberInput > div > div > input {
        border-radius: 8px;
    }

    /* Divider */
    hr {
        border-color: #1E2533;
    }

    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}

    /* Scrollbar */
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-track {
        background: #0E1117;
    }
    ::-webkit-scrollbar-thumb {
        background: #2A3040;
        border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #3A4050;
    }
</style>
"""


def inject_theme():
    """Injeta o CSS custom no app Streamlit."""
    import streamlit as st
    st.markdown(CUSTOM_CSS, unsafe_allow_html=True)

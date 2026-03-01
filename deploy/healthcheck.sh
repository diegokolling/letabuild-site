#!/bin/bash
# Cron a cada 5 min: */5 * * * * /opt/apps/scripts/healthcheck.sh
# Verifica se os apps estao respondendo e reinicia via supervisor se necessario

LOG="/var/log/healthcheck.log"

check_app() {
    local name=$1
    local url=$2
    local status

    status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$url" 2>/dev/null)

    if [ "$status" != "200" ]; then
        echo "[$(date)] WARN: $name returned $status - restarting" >> "$LOG"
        supervisorctl restart "$name" >> "$LOG" 2>&1
    fi
}

check_app "podcast-digest" "http://127.0.0.1:8501/_stcore/health"
check_app "btc-signal" "http://127.0.0.1:8050/"

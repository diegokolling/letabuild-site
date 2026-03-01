#!/bin/bash
# Cron diario: 0 3 * * * /opt/apps/scripts/backup-sqlite.sh
# Backup do SQLite do Podcast Digest para repo GitHub privado

set -e

BACKUP_DIR="/opt/apps/backups"
DB_PATH="/opt/apps/podcast/podcast_digest.db"
REPO_DIR="/opt/apps/backups/repo"
DATE=$(date +%Y-%m-%d)

mkdir -p "$BACKUP_DIR"

# SQLite backup seguro (nao copia arquivo em uso)
sqlite3 "$DB_PATH" ".backup '${BACKUP_DIR}/podcast_digest_${DATE}.db'"

# Manter apenas os ultimos 7 dias de backups locais
find "$BACKUP_DIR" -name "podcast_digest_*.db" -mtime +7 -delete

# Push para GitHub (se repo configurado)
if [ -d "$REPO_DIR/.git" ]; then
    cp "${BACKUP_DIR}/podcast_digest_${DATE}.db" "${REPO_DIR}/podcast_digest.db"
    cd "$REPO_DIR"
    git add podcast_digest.db
    git commit -m "backup ${DATE}" --allow-empty-message 2>/dev/null || true
    git push origin main 2>/dev/null || echo "Git push failed, will retry next run"
fi

echo "[$(date)] Backup completed: podcast_digest_${DATE}.db"

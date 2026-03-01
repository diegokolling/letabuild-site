#!/bin/bash
# Script de setup do VPS Oracle Cloud (Ubuntu 22.04 ARM)
# Executar como root: sudo bash setup-vps.sh

set -e

echo "=== Atualizando sistema ==="
apt update && apt upgrade -y

echo "=== Instalando dependencias ==="
apt install -y nginx supervisor python3.11 python3.11-venv python3-pip sqlite3 git curl ufw

echo "=== Criando usuario appuser ==="
useradd -m -s /bin/bash appuser 2>/dev/null || echo "User appuser already exists"

echo "=== Criando diretorios ==="
mkdir -p /opt/apps/{podcast,btc,scripts,backups}
chown -R appuser:appuser /opt/apps

echo "=== Configurando firewall (somente IPs do Cloudflare) ==="
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh

# IPs do Cloudflare (IPv4)
# https://www.cloudflare.com/ips-v4/
for ip in 173.245.48.0/20 103.21.244.0/22 103.22.200.0/22 103.31.4.0/22 \
          141.101.64.0/18 108.162.192.0/18 190.93.240.0/20 188.114.96.0/20 \
          197.234.240.0/22 198.41.128.0/17 162.158.0.0/15 104.16.0.0/13 \
          104.24.0.0/14 172.64.0.0/13 131.0.72.0/22; do
    ufw allow from "$ip" to any port 80
    ufw allow from "$ip" to any port 443
done

ufw --force enable

echo "=== Configurando SSL (Cloudflare Origin Certificate) ==="
mkdir -p /etc/ssl/cloudflare
echo "ACAO MANUAL: Copie origin.pem e origin-key.pem para /etc/ssl/cloudflare/"
echo "  1. Cloudflare Dashboard > SSL/TLS > Origin Server > Create Certificate"
echo "  2. Hostnames: *.letabuild.com, letabuild.com"
echo "  3. Validade: 15 anos"

echo "=== Setup do Podcast Digest ==="
su - appuser -c "
cd /opt/apps/podcast
python3.11 -m venv venv
source venv/bin/activate
# Copie os arquivos do projeto para /opt/apps/podcast/ antes
# pip install -r requirements.txt
"

echo "=== Setup do BTC Signal Tracker ==="
su - appuser -c "
cd /opt/apps/btc
python3.11 -m venv venv
source venv/bin/activate
# Copie os arquivos do projeto para /opt/apps/btc/ antes
# pip install -r requirements.txt
"

echo "=== Instalando configs ==="
echo "ACAO MANUAL: Copie os arquivos de config:"
echo "  cp nginx-letabuild.conf /etc/nginx/sites-available/letabuild"
echo "  ln -s /etc/nginx/sites-available/letabuild /etc/nginx/sites-enabled/"
echo "  rm -f /etc/nginx/sites-enabled/default"
echo "  cp supervisor-apps.conf /etc/supervisor/conf.d/apps.conf"

echo "=== Instalando scripts de manutencao ==="
cp /opt/apps/scripts/backup-sqlite.sh /opt/apps/scripts/ 2>/dev/null || true
cp /opt/apps/scripts/healthcheck.sh /opt/apps/scripts/ 2>/dev/null || true
chmod +x /opt/apps/scripts/*.sh

echo "=== Configurando crons ==="
(crontab -l 2>/dev/null; echo "0 3 * * * /opt/apps/scripts/backup-sqlite.sh") | sort -u | crontab -
(crontab -l 2>/dev/null; echo "*/5 * * * * /opt/apps/scripts/healthcheck.sh") | sort -u | crontab -
(crontab -l 2>/dev/null; echo "0 4 * * 0 /opt/apps/podcast/venv/bin/pip install -U yt-dlp") | sort -u | crontab -

echo ""
echo "=== Setup concluido! ==="
echo ""
echo "Proximos passos:"
echo "  1. Copie os arquivos dos projetos para /opt/apps/podcast/ e /opt/apps/btc/"
echo "  2. Instale as dependencias: cd /opt/apps/podcast && source venv/bin/activate && pip install -r requirements.txt"
echo "  3. Copie .env e config.yaml para /opt/apps/podcast/"
echo "  4. Copie os certificados SSL para /etc/ssl/cloudflare/"
echo "  5. Copie as configs: nginx e supervisor (comandos acima)"
echo "  6. nginx -t && systemctl restart nginx"
echo "  7. supervisorctl reread && supervisorctl update"
echo "  8. No Cloudflare: adicione registros A para podcast e btc apontando para o IP deste VPS"

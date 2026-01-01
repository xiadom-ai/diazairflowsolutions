#!/bin/bash
set -e

# Determine script location
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Load environment variables
if [ -f "${PROJECT_ROOT}/.env.local" ]; then
    export $(grep -v '^#' "${PROJECT_ROOT}/.env.local" | xargs)
fi

SERVER_USER="${USER}"
SERVER_IP="${REMOTE_IP}"
REMOTE_CONFIG_PATH="/etc/nginx/sites-available/diazairflowsolutions.com"

echo "Updating Nginx configuration on ${SERVER_IP}..."

# Upload config to home first
scp "${PROJECT_ROOT}/config/nginx.conf" ${SERVER_USER}@${SERVER_IP}:~/nginx.conf.tmp

# Move to correct location and reload (requires sudo)
ssh ${SERVER_USER}@${SERVER_IP} "bash -s" << EOF
    # Use password for sudo commands
    echo "$PASSWORD" | sudo -S mv ~/nginx.conf.tmp ${REMOTE_CONFIG_PATH}
    echo "$PASSWORD" | sudo -S chown root:root ${REMOTE_CONFIG_PATH}
    
    echo "Testing Nginx configuration..."
    echo "$PASSWORD" | sudo -S nginx -t
    
    echo "Reloading Nginx..."
    echo "$PASSWORD" | sudo -S systemctl reload nginx
EOF

echo "Nginx update complete!"

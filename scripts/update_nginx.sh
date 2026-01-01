#!/bin/bash
set -e

# Determine script location
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Load environment variables
if [ -f "${PROJECT_ROOT}/.env.local" ]; then
    # Safer environment variable loading that handles spaces in values
    while IFS= read -r line || [ -n "$line" ]; do
        # Skip comments and empty lines
        [[ "$line" =~ ^#.*$ ]] && continue
        [[ -z "$line" ]] && continue
        
        # Remove inline comments (space followed by #)
        line=$(echo "$line" | sed 's/[[:space:]][[:space:]]*#.*$//')

        # Only export lines with an equals sign
        if [[ "$line" =~ = ]]; then
            export "$line"
        fi
    done < "${PROJECT_ROOT}/.env.local"
fi

# ENV loading above sets USER if present
# We prefer SSH_USER if set, otherwise use USER (from env or system), otherwise whoami
SSH_USER="${SSH_USER:-${USER:-$(whoami)}}"
SERVER_IP="${REMOTE_IP}"

# Configuration with defaults
APP_DOMAIN="${APP_DOMAIN:-diazairflowsolutions.com}"
APP_PORT="${PORT:-3000}"
REMOTE_CONFIG_PATH="${REMOTE_CONFIG_PATH:-/etc/nginx/sites-available/${APP_DOMAIN}.conf}"

echo "Applying Nginx Reverse Proxy configuration..."
echo "Target: ${SSH_USER}@${SERVER_IP}"
echo "Domain: ${APP_DOMAIN}"
echo "Port: ${APP_PORT}"

# Create a temporary config file with values replaced
TEMP_CONFIG=$(mktemp)
sed -e "s/{{DOMAIN}}/${APP_DOMAIN}/g" \
    -e "s/{{PORT}}/${APP_PORT}/g" \
    "${PROJECT_ROOT}/config/nginx_proxy.conf" > "${TEMP_CONFIG}"

# Upload config to home first
scp "${TEMP_CONFIG}" ${SSH_USER}@${SERVER_IP}:~/nginx.conf.tmp

# Clean up local temp file
rm "${TEMP_CONFIG}"

# Move to correct location and reload (requires sudo)
ssh ${SSH_USER}@${SERVER_IP} "bash -s" << EOF
    # Use password for sudo commands
    echo "$PASSWORD" | sudo -S mv ~/nginx.conf.tmp ${REMOTE_CONFIG_PATH}
    echo "$PASSWORD" | sudo -S chown root:root ${REMOTE_CONFIG_PATH}
    
    echo "Testing Nginx configuration..."
    echo "$PASSWORD" | sudo -S nginx -t
    
    echo "Reloading Nginx..."
    echo "$PASSWORD" | sudo -S systemctl reload nginx
EOF

echo "Nginx proxy configuration applied successfully for ${APP_DOMAIN}!"

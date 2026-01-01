#!/bin/bash

# Enable strict mode
set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Configuration
APP_NAME="${APP_NAME:-diazairflowsolutions}"
APP_PORT="${PORT:-3001}"
REMOTE_TARGET_DIR="${REMOTE_TARGET_DIR:-/var/www/diazairflowsolutions.com}"

# Logging Functions
log_info() {
    echo -e "\e[34m[INFO]\e[0m $1"
}

log_success() {
    echo -e "\e[32m[SUCCESS]\e[0m $1"
}

log_error() {
    echo -e "\e[31m[ERROR]\e[0m $1"
}

log_step() {
    echo "------------------------------------------------------------------------------"
    echo -e "\e[1m$1\e[0m"
    echo "------------------------------------------------------------------------------"
}

# 1. Load Configuration & Environment
# ------------------------------------------------------------------------------
log_step "1. Loading Configuration"
log_info "Date: $(date)"

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
    log_success "Loaded environment variables from .env.local"
else
    log_error ".env.local file not found."
    exit 1
fi

if [ -z "$PASSWORD" ]; then
    log_error "PASSWORD variable is missing in .env.local"
    exit 1
fi

if [ -z "$REMOTE_IP" ]; then
    log_error "REMOTE_IP variable is missing in .env.local"
    exit 1
fi

SSH_USER="${SSH_USER:-${USER:-$(whoami)}}"
SERVER_IP="${REMOTE_IP}"

echo "      Target:   ${SSH_USER}@${SERVER_IP}"
echo "      Path:     ${REMOTE_TARGET_DIR}"
echo "      App Name: ${APP_NAME}"
echo "      Port:     ${APP_PORT}"

# 2. Build Project
# ------------------------------------------------------------------------------
log_step "2. Building Project Locally"
cd "${PROJECT_ROOT}"

if npm run build; then
    log_success "Build completed successfully."
else
    log_error "Build failed."
    exit 1
fi

# 3. Sync Files
# ------------------------------------------------------------------------------
log_step "3. Deploying Files to Server"

# Create remote directory
log_info "Ensuring remote directory exists..."
if ssh ${SSH_USER}@${REMOTE_IP} "echo '$PASSWORD' | sudo -S mkdir -p ${REMOTE_TARGET_DIR} && echo '$PASSWORD' | sudo -S chown -R ${SSH_USER}:${SSH_USER} ${REMOTE_TARGET_DIR}"; then
    log_success "Remote directory ready."
else
    log_error "Failed to create/permission remote directory."
    exit 1
fi

# Sync files
log_info "Syncing files..."
if rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.env*' \
    --exclude 'scripts' \
    ./ ${SSH_USER}@${REMOTE_IP}:${REMOTE_TARGET_DIR}; then
    log_success "Files synced successfully."
else
    log_error "File sync failed."
    exit 1
fi

# Sync/Create .env
log_info "Configuring environment..."
if [ -f ".env.production" ]; then
    rsync -avz .env.production ${SSH_USER}@${REMOTE_IP}:${REMOTE_TARGET_DIR}/.env.local
else
    # Fallback: Create basic env with critical vars
    ssh ${SSH_USER}@${REMOTE_IP} "echo 'RESEND_API_KEY=${RESEND_API_KEY}' > ${REMOTE_TARGET_DIR}/.env.local"
fi

# 4. Install & Restart
# ------------------------------------------------------------------------------
log_step "4. Installing & Restarting Application"

ssh ${SSH_USER}@${REMOTE_IP} "bash -s" << EOF
    set -e
    cd ${REMOTE_TARGET_DIR}
    
    export NVM_DIR="\$HOME/.nvm"
    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"

    echo ">>> Node Version: \$(node -v)"
    
    echo ">>> Installing dependencies..."
    npm ci --omit=dev
    
    echo ">>> Managing PM2 process for ${APP_NAME}..."
    if pm2 describe "${APP_NAME}" > /dev/null 2>&1; then
        echo "Reloading application..."
        pm2 reload "${APP_NAME}" --update-env
    else
        echo "Starting application on port ${APP_PORT}..."
        PORT=${APP_PORT} pm2 start npm --name "${APP_NAME}" -- start
        pm2 save
    fi
EOF

if [ $? -eq 0 ]; then
    log_success "Application restarted successfully."
else
    log_error "Failed to restart application."
    exit 1
fi

# 5. Verify Deployment
# ------------------------------------------------------------------------------
log_step "5. Verifying Deployment & Nginx"

ssh ${SSH_USER}@${REMOTE_IP} "bash -s" << EOF
    # Visual separator for remote output
    echo "--- Remote Verification ---"
    
    # Check 1: App Health (Internal)
    echo -n "Checking App Health (localhost:${APP_PORT})... "
    APP_ONLINE=false
    # Retry loop: 12 attempts * 5 seconds = 60 seconds max wait
    for i in {1..12}; do
        if curl -sI -o /dev/null -w '%{http_code}' http://localhost:${APP_PORT} | grep -q '200'; then
            echo -e "\e[32m[OK]\e[0m"
            APP_ONLINE=true
            break
        fi
        echo -n "."
        sleep 5
    done
    
    if [ "\$APP_ONLINE" != "true" ]; then
        echo -e "\e[31m[FAILED]\e[0m"
        echo "WARNING: Application did not start responding on localhost:${APP_PORT} after 60 seconds."
        exit 1
    fi

    # Check 2: Nginx Status
    echo -n "Checking Nginx Service... "
    if systemctl is-active --quiet nginx; then
        echo -e "\e[32m[Active]\e[0m"
    else
        echo -e "\e[31m[Inactive]\e[0m"
        echo "WARNING: Nginx service is not running!"
        exit 1
    fi

    # Check 3: Nginx Config Syntax
    echo -n "Verifying Nginx Config... "
    if echo "$PASSWORD" | sudo -S nginx -t > /dev/null 2>&1; then
        echo -e "\e[32m[Valid]\e[0m"
    else
        echo -e "\e[31m[Invalid]\e[0m"
        echo "WARNING: Nginx configuration has errors!"
        # We don't exit here to allow manual inspection, but it's a critical error
        echo "$PASSWORD" | sudo -S nginx -t
        exit 1
    fi
EOF

if [ $? -eq 0 ]; then
    log_success "All verifications passed!"
    echo ""
    log_success "Deployment Complete! Site should be live."
else
    log_error "Verification stage failed. Check the logs above."
    exit 1
fi

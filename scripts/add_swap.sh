#!/bin/bash
set -e

# Determine script location
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

if [ -f "${PROJECT_ROOT}/.env.local" ]; then
    export $(grep -v '^#' "${PROJECT_ROOT}/.env.local" | xargs)
fi

SSH_USER="${SSH_USER:-${USER:-$(whoami)}}"
SERVER_IP="${REMOTE_IP}"

echo "Adding 1GB Swap to ${SERVER_IP}..."

ssh ${SSH_USER}@${SERVER_IP} "bash -s" << EOF
    # Check if swap already exists
    if swapon --show | grep -q '/swapfile'; then
        echo "Swap file already exists."
        free -h
        exit 0
    fi

    echo "Creating swap file..."
    echo "$PASSWORD" | sudo -S fallocate -l 1G /swapfile
    echo "$PASSWORD" | sudo -S chmod 600 /swapfile
    echo "$PASSWORD" | sudo -S mkswap /swapfile
    echo "$PASSWORD" | sudo -S swapon /swapfile
    
    # Make permanent
    echo "$PASSWORD" | sudo -S sh -c "echo '/swapfile none swap sw 0 0' >> /etc/fstab"
    
    echo "Swap created!"
    free -h
EOF

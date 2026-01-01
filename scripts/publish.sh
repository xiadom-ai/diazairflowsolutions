#!/bin/bash

# Enable strict mode
set -e

# Get script and project directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Variables
GITHUB_REPO="https://github.com/xiadom-ai/diazairflowsolutions"

# Logging Functions
log_info() {
    echo -e "ℹ️  \e[34m[INFO]\e[0m $1"
}

log_success() {
    echo -e "✅ \e[32m[SUCCESS]\e[0m $1"
}

log_error() {
    echo -e "❌ \e[31m[ERROR]\e[0m $1"
}

log_step() {
    echo "------------------------------------------------------------------------------"
    echo -e "🚀 \e[1m$1\e[0m"
    echo "------------------------------------------------------------------------------"
}

# 1. Pre-flight Checks
# ------------------------------------------------------------------------------
log_step "1. Pre-flight Checks"

cd "${PROJECT_ROOT}"

# Check if it's a git repository
if [ ! -d ".git" ]; then
    log_error "Not a git repository. Please initialize git first."
    exit 1
fi

# Check for uncommitted changes
if git diff-index --quiet HEAD --; then
    log_info "No changes to commit."
    
    # Check if there are untracked files
    if [ -n "$(git ls-files --others --exclude-standard)" ]; then
        log_info "Untracked files found."
    else
        log_success "Clean working directory. Nothing to do. ✨"
        exit 0
    fi
fi

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
log_info "Current branch: ${CURRENT_BRANCH}"

# 2. Prepare Changes
# ------------------------------------------------------------------------------
log_step "2. Preparing Changes"

# Add all changes
log_info "Adding all changes..."
git add .

# Show status
git status -s

# 3. Commit Changes
# ------------------------------------------------------------------------------
log_step "3. Committing Changes"

# Get commit message from argument or prompt
COMMIT_MSG="$1"

if [ -z "$COMMIT_MSG" ]; then
    echo -n "📝 Enter commit message: "
    read -r COMMIT_MSG
fi

if [ -z "$COMMIT_MSG" ]; then
    log_error "Commit message is required."
    exit 1
fi

log_info "Committing with message: ${COMMIT_MSG}"
git commit -m "${COMMIT_MSG}"

# 4. Sync with Remote
# ------------------------------------------------------------------------------
log_step "4. Syncing with Remote"

log_info "Pulling latest changes from origin ${CURRENT_BRANCH} (rebase)..."
if git pull --rebase origin "${CURRENT_BRANCH}"; then
    log_success "Sync successful."
else
    log_error "Sync failed. Please resolve conflicts manually."
    exit 1
fi

# 5. Push to GitHub
# ------------------------------------------------------------------------------
log_step "5. Pushing to GitHub"

log_info "Pushing to origin ${CURRENT_BRANCH}..."
if git push origin "${CURRENT_BRANCH}"; then
    log_success "Changes published successfully to GitHub!"
else
    log_error "Push failed. Check your permissions and remote configuration."
    exit 1
fi

echo ""
log_success "Done! Your code is now live on GitHub: ${GITHUB_REPO} 🌐"

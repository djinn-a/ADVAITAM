#!/bin/bash

# Advaitam Villas - Cloudflare Pages Deployment Script
# Builds and deploys to Cloudflare Pages using Wrangler CLI

set -e

echo "🚀 Deploying Advaitam Villas to Cloudflare Pages..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_NAME="advaitam-villas"
BRANCH="main"

# Parse arguments
COMMIT_DIRTY=false
if [ "$1" = "--commit-dirty" ] || [ "$1" = "-d" ]; then
    COMMIT_DIRTY=true
fi

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "wrangler.toml" ]; then
    echo -e "${RED}❌ Error: Must run from project root directory${NC}"
    exit 1
fi

# Step 1: Install dependencies if needed
echo ""
echo "📦 Step 1: Checking dependencies..."
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules/.package-lock.json" ]; then
    echo "Installing dependencies..."
    pnpm install
else
    echo -e "${GREEN}✅ Dependencies up to date${NC}"
fi

# Step 2: Build
echo ""
echo "🔨 Step 2: Building..."
pnpm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build successful${NC}"

# Step 3: Deploy
echo ""
echo "🌐 Step 3: Deploying to Cloudflare Pages..."
echo -e "${BLUE}   Project: $PROJECT_NAME${NC}"
echo -e "${BLUE}   Branch:  $BRANCH${NC}"
echo ""

DEPLOY_CMD="pnpm wrangler pages deploy dist --project-name $PROJECT_NAME --branch $BRANCH"
if [ "$COMMIT_DIRTY" = true ]; then
    DEPLOY_CMD="$DEPLOY_CMD --commit-dirty=true"
fi

echo "Running: $DEPLOY_CMD"
echo ""

$DEPLOY_CMD

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Deployment complete!${NC}"
else
    echo ""
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

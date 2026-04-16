#!/bin/bash

# Advaitam Villas - Full Stack Startup Script
# Builds frontend and starts Wrangler dev server with D1 database

set -e

echo "🚀 Starting Advaitam Villas..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PORT=8788

# Function to kill process on a port
kill_port() {
    local port=$1
    local pids=$(lsof -ti:$port 2>/dev/null || true)
    if [ -n "$pids" ]; then
        echo -e "${YELLOW}⚠️  Port $port is occupied. Killing existing processes...${NC}"
        echo "$pids" | xargs kill -9 2>/dev/null || true
        sleep 1
        echo -e "${GREEN}✅ Port $port cleared${NC}"
    fi
}

# Step 1: Clear ports
echo ""
echo "📍 Step 1: Clearing ports..."
kill_port $PORT
kill_port 5173  # Vite default port (just in case)

# Step 2: Install dependencies if needed
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules/.package-lock.json" ]; then
    echo ""
    echo "📦 Step 2: Installing dependencies..."
    pnpm install
fi

# Step 3: Build frontend
echo ""
echo "🔨 Step 3: Building frontend..."
pnpm run build

# Step 4: Start Wrangler dev server
echo ""
echo "🌐 Step 4: Starting Wrangler (frontend + backend + D1)..."
echo -e "${GREEN}✨ Server will be available at: http://localhost:$PORT${NC}"
echo ""
echo "Press [x] then Enter to stop, or Ctrl+C"
echo ""

# Start the server
pnpm wrangler pages dev dist --d1 D1 --port $PORT

#!/usr/bin/env bash
set -e

APP_NAME="miniproject4-next"
APP_DIR="/home/ubuntu/apps/miniproject4-next"
PORT=3000

cd "$APP_DIR"

# pm2 없으면 설치
if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

# node_modules 없으면 설치 (프로덕션 의존성만)
if [ ! -d node_modules ]; then
  npm ci --omit=dev
fi

# Next.js 실행
pm2 start "npx next start -p $PORT" --name "$APP_NAME"
pm2 save

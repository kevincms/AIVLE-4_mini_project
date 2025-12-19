#!/usr/bin/env bash
set -e

APP_NAME="miniproject4-next"

# pm2가 없으면 그냥 종료
command -v pm2 >/dev/null 2>&1 || exit 0

pm2 delete "$APP_NAME" || true
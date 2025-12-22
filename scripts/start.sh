#!/bin/bash
set -e

APP_DIR="/home/ubuntu/app"
PID_FILE="$APP_DIR/app.pid"
LOG_FILE="$APP_DIR/app.log"

cd "$APP_DIR"

# 이미 실행 중이면 중복 실행 방지
if [ -f "$PID_FILE" ]; then
  echo "App already running (PID: $(cat $PID_FILE))" >> "$LOG_FILE"
  exit 0
fi

# 새로운 세션으로 실행 (중요)
nohup setsid npm run start > "$LOG_FILE" 2>&1 &

# 프로세스 그룹 ID 저장
echo $! > "$PID_FILE"

echo "App started (PGID: $(cat $PID_FILE))" >> "$LOG_FILE"
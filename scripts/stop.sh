#!/bin/bash

APP_DIR="/home/ubuntu/app"
PID_FILE="$APP_DIR/app.pid"
LOG_FILE="$APP_DIR/app.log"

if [ -f "$PID_FILE" ]; then
  PGID=$(cat "$PID_FILE")

  # 프로세스 그룹 전체 종료
  kill -TERM -- -$PGID || true

  rm -f "$PID_FILE"
  echo "App stopped (PGID: $PGID)" >> "$LOG_FILE"
else
  echo "No PID file found" >> "$LOG_FILE"
fi

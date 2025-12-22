#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/ubuntu/apps/miniproject4-next"
PID_FILE="$APP_DIR/app.pid"
LOG="/home/ubuntu/apps/stop.log"   # <- APP_DIR 없어도 되는 위치

mkdir -p "$(dirname "$LOG")"
touch "$LOG"

echo "===== STOP $(date -u) =====" >> "$LOG"

# 1) PID 파일 기반 종료 (있으면)
if [ -f "$PID_FILE" ]; then
  PID="$(cat "$PID_FILE" || true)"
  if [ -n "${PID}" ] && ps -p "$PID" >/dev/null 2>&1; then
    echo "Killing PID from pidfile: $PID" >> "$LOG"
    kill -TERM "$PID" || true
    sleep 2
    kill -KILL "$PID" 2>/dev/null || true
  fi
  rm -f "$PID_FILE" || true
else
  echo "No PID file found: $PID_FILE" >> "$LOG"
fi

# 2) (옵션이지만 강추) 포트 기반으로 한 번 더 정리
PORT=3000
PORT_PID="$(lsof -ti :${PORT} 2>/dev/null | head -n 1 || true)"
if [ -n "${PORT_PID}" ]; then
  echo "Port ${PORT} still in use by PID=${PORT_PID}. Killing..." >> "$LOG"
  kill -TERM "$PORT_PID" || true
  sleep 2
  kill -KILL "$PORT_PID" 2>/dev/null || true
fi

echo "===== STOP END $(date -u) =====" >> "$LOG"

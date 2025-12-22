#!/usr/bin/env bash
set -u

APP_DIR="/home/ubuntu/apps/miniproject4-next"
PORT=3000
LOG="$APP_DIR/stop.log"
PID_FILE="$APP_DIR/app.pid"

mkdir -p "$APP_DIR"
echo "===== STOP $(date) =====" >> "$LOG"

stop_pid() {
  local pid="$1"
  if ps -p "$pid" > /dev/null 2>&1; then
    echo "Stopping PID $pid (SIGTERM)..." >> "$LOG"
    kill "$pid" >/dev/null 2>&1 || true

    # 최대 15초 대기
    for i in {1..15}; do
      if ps -p "$pid" > /dev/null 2>&1; then
        sleep 1
      else
        echo "PID $pid stopped." >> "$LOG"
        return 0
      fi
    done

    echo "PID $pid still alive. Sending SIGKILL..." >> "$LOG"
    kill -9 "$pid" >/dev/null 2>&1 || true
  else
    echo "PID $pid not running." >> "$LOG"
  fi
}

# 1) pid 파일 기반 종료
if [ -f "$PID_FILE" ]; then
  PID="$(cat "$PID_FILE" 2>/dev/null || true)"
  if [ -n "${PID:-}" ]; then
    stop_pid "$PID"
  fi
  rm -f "$PID_FILE" >/dev/null 2>&1 || true
else
  echo "No pid file found." >> "$LOG"
fi

# # 2) 보험: 포트 점유 프로세스 종료 (lsof 없을 수 있어 fuser도 같이)
# if command -v lsof >/dev/null 2>&1; then
#   PIDS="$(lsof -ti tcp:$PORT 2>/dev/null || true)"
#   if [ -n "${PIDS:-}" ]; then
#     echo "Found PIDs on port $PORT via lsof: $PIDS" >> "$LOG"
#     for p in $PIDS; do stop_pid "$p"; done
#   fi
# fi

# if command -v fuser >/dev/null 2>&1; then
#   # fuser는 PID만 출력하진 않아도 종료는 가능
#   if fuser -n tcp "$PORT" >/dev/null 2>&1; then
#     echo "Killing processes on port $PORT via fuser..." >> "$LOG"
#     fuser -k -n tcp "$PORT" >/dev/null 2>&1 || true
#   fi
# fi

echo "===== STOP END $(date) =====" >> "$LOG"
exit 0

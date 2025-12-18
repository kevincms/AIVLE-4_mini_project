#!/bin/bash
set -e

APP_DIR="/home/ubuntu/app"

# 기존 앱 종료(단순 버전)
pkill -f 'java -jar' || true

# 새 앱 실행
JAR=$(ls -1 "$APP_DIR"/*.jar | head -n 1)
nohup java -jar "$JAR" > "$APP_DIR/app.log" 2>&1 &

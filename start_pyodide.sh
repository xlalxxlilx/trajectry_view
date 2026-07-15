#!/bin/bash
# Pyodide版 (Python不要ブラウザ内 ASE) の起動スクリプト
cd "$(dirname "$0")"

PORT=8080

# 既にポートが使われていれば再起動しない
lsof -ti:$PORT > /dev/null 2>&1 || {
    python3 -m http.server $PORT --directory . &
    echo "静的サーバーをポート $PORT で起動しました"
}

sleep 1
xdg-open http://localhost:$PORT/web_pyodide/index.html

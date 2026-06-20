#!/bin/bash
cd "$(dirname "$0")"
python3 app.py &
sleep 1
xdg-open http://localhost:5000

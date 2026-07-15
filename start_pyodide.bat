@echo off
setlocal
cd /d "%~dp0"
set PORT=8080

echo Starting static server on port %PORT%...
echo Open this URL in your browser:
echo http://127.0.0.1:%PORT%/web_pyodide/index.html
echo.

where py >nul 2>nul
if %errorlevel%==0 (
  start "" "http://127.0.0.1:%PORT%/web_pyodide/index.html"
  py -m http.server %PORT%
  goto :eof
)

where python >nul 2>nul
if %errorlevel%==0 (
  start "" "http://127.0.0.1:%PORT%/web_pyodide/index.html"
  python -m http.server %PORT%
  goto :eof
)

echo Python launcher (py) or python was not found.
echo Install Python and try again.
pause

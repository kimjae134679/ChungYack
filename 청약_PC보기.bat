@echo off
setlocal
title ChungYack PC
where git >nul 2>&1
if not errorlevel 1 (
  git -C "%~dp0" pull --ff-only >nul 2>&1
)
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-pc.ps1"
if errorlevel 1 (
  echo.
  echo [ERROR] Could not open ChungYack PC. See the message above.
  pause
)
endlocal

@echo off
setlocal
cd /d "%~dp0"
echo ========================================
echo  ChungYack Radar - Android APK Build
echo ========================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\build-android-local.ps1"
if errorlevel 1 (
  echo.
  echo BUILD FAILED
  pause
  exit /b 1
)
echo.
echo BUILD COMPLETE
pause

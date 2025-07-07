@echo off
echo Healthcare Frontend Starter
echo =========================

cd /d "%~dp0"

echo Checking for Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo Node.js is not installed or not in PATH
  echo Please install Node.js from https://nodejs.org/
  pause
  exit /b 1
)

echo Checking for npm...
where npm >nul 2>nul
if %errorlevel% neq 0 (
  echo npm is not installed or not in PATH
  echo Please install Node.js from https://nodejs.org/
  pause
  exit /b 1
)

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
  echo Failed to install dependencies
  pause
  exit /b 1
)

echo Starting development server...
call npm run dev

pause

# Frontend Run Script
# Run just the React frontend for the Breast Cancer Detection System

# Define paths
$frontendPath = Join-Path -Path $PSScriptRoot -ChildPath "frontend"

# Display info
Write-Host "Starting Breast Cancer Detection Frontend..." -ForegroundColor Cyan
Write-Host "Using path: $frontendPath" -ForegroundColor Yellow

# Change to frontend directory
Set-Location -Path $frontendPath

# Check if node_modules exists
if (-not (Test-Path -Path "node_modules")) {
    Write-Host "Installing dependencies first..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "Dependencies already installed." -ForegroundColor Green
}

# Run the frontend app
Write-Host "Starting development server..." -ForegroundColor Green
npm run dev

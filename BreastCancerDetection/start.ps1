# PowerShell script to install dependencies and start services
# BreastCancerDetection/start.ps1

# Define colors for output
$Green = [ConsoleColor]::Green
$Yellow = [ConsoleColor]::Yellow
$Cyan = [ConsoleColor]::Cyan
$Red = [ConsoleColor]::Red

# Function to display colored messages
function Write-ColorMessage {
    param ([string]$Message, [ConsoleColor]$Color)
    Write-Host $Message -ForegroundColor $Color
}

# Function to check if a command exists
function Test-CommandExists {
    param ([string]$Command)
    return $null -ne (Get-Command $Command -ErrorAction SilentlyContinue)
}

# Show banner
Write-ColorMessage "===================================================" $Cyan
Write-ColorMessage "      BREAST CANCER DETECTION SYSTEM SETUP         " $Cyan
Write-ColorMessage "===================================================" $Cyan
Write-ColorMessage "This script will set up and start all components of the system." $Yellow
Write-ColorMessage "1. MongoDB Backend Server" $Yellow
Write-ColorMessage "2. Python Flask AI Model Service" $Yellow
Write-ColorMessage "3. React Frontend" $Yellow
Write-ColorMessage "===================================================" $Cyan

# Check prerequisites
Write-ColorMessage "`nChecking prerequisites..." $Green

$prereqs_ok = $true

if (-not (Test-CommandExists "node")) {
    Write-ColorMessage "Node.js is not installed! Please install Node.js and npm." $Red
    $prereqs_ok = $false
} else {
    $node_version = node -v
    Write-ColorMessage "Node.js is installed: $node_version" $Green
}

if (-not (Test-CommandExists "python")) {
    Write-ColorMessage "Python is not installed! Please install Python 3.8 or higher." $Red
    $prereqs_ok = $false
} else {
    $python_version = python --version
    Write-ColorMessage "Python is installed: $python_version" $Green
}

if (-not $prereqs_ok) {
    Write-ColorMessage "`nPlease install the required prerequisites and try again." $Red
    exit 1
}

# Setup and start MongoDB server
Write-ColorMessage "`n[1/3] Setting up MongoDB Backend Server..." $Green

# Make sure we're using the absolute path to avoid directory issues
$serverPath = Join-Path -Path $PSScriptRoot -ChildPath "server"
Set-Location -Path $serverPath
Write-ColorMessage "Using server path: $serverPath" $Yellow
Write-ColorMessage "Installing server dependencies..." $Yellow
npm install

Write-ColorMessage "Setting up database with sample data..." $Yellow
npm run seed

Write-ColorMessage "Starting MongoDB server in a new window..." $Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location -Path '$serverPath'; npm run dev"

# Setup and start AI model service
Write-ColorMessage "`n[2/3] Setting up AI Model Service..." $Green

# Make sure we're using the absolute path to avoid directory issues
$modelServicePath = Join-Path -Path $PSScriptRoot -ChildPath "model_service"
Set-Location -Path $modelServicePath
Write-ColorMessage "Using model service path: $modelServicePath" $Yellow
Write-ColorMessage "Installing Python dependencies..." $Yellow
pip install -r requirements.txt

Write-ColorMessage "Starting Flask AI Model Service in a new window..." $Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location -Path '$modelServicePath'; python app.py"

# Setup and start frontend
Write-ColorMessage "`n[3/3] Setting up React Frontend..." $Green

# Make sure we're using the absolute path to avoid directory issues
$frontendPath = Join-Path -Path $PSScriptRoot -ChildPath "frontend"
Set-Location -Path $frontendPath
Write-ColorMessage "Using frontend path: $frontendPath" $Yellow
Write-ColorMessage "Installing frontend dependencies..." $Yellow
npm install

Write-ColorMessage "Starting React development server in a new window..." $Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location -Path '$frontendPath'; npm run dev"

# Return to the main directory
Set-Location -Path "$PSScriptRoot"

Write-ColorMessage "`n===================================================" $Cyan
Write-ColorMessage "            SETUP COMPLETE!                        " $Cyan
Write-ColorMessage "===================================================" $Cyan
Write-ColorMessage "MongoDB Server:      http://localhost:4000/api     " $Green
Write-ColorMessage "AI Model Service:    http://localhost:5000         " $Green
Write-ColorMessage "Frontend:            http://localhost:5173         " $Green
Write-ColorMessage "===================================================" $Cyan
Write-ColorMessage "To access the app, navigate to http://localhost:5173 in your browser." $Cyan

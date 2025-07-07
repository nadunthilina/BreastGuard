# PowerShell script to directly run Ballerina without requiring PATH setup

# Define possible Ballerina installation locations
$possibleLocations = @(
    "C:\Program Files\Ballerina\2201.7.0\bin\bal.exe",
    "C:\Program Files\Ballerina\2201.6.0\bin\bal.exe",
    "C:\Program Files\Ballerina\2201.5.0\bin\bal.exe",
    "C:\Program Files\Ballerina\2201.4.0\bin\bal.exe",
    "C:\Program Files\Ballerina\2201.3.0\bin\bal.exe",
    "C:\Program Files\Ballerina\2201.8.0\bin\bal.exe",
    "C:\Ballerina\bin\bal.exe"
)

$balFound = $false
$balPath = ""

# Find Ballerina executable
foreach ($location in $possibleLocations) {
    if (Test-Path $location) {
        $balFound = $true
        $balPath = $location
        Write-Host "Found Ballerina at: $balPath"
        break
    }
}

if (-not $balFound) {
    Write-Host "Ballerina executable not found. Please specify the path manually."
    $balPath = Read-Host "Enter the full path to bal.exe"
    
    if (-not (Test-Path $balPath)) {
        Write-Host "Invalid path. Exiting."
        exit 1
    }
}

# Navigate to project directory
Set-Location -Path "F:\hackthon\Ballerina\Healthcare\Healthcare"

# Run Ballerina
Write-Host "Running Ballerina application..."
& $balPath run

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to run Ballerina application. Please check your installation and try again."
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Improved script to run Ballerina

# Function to find Ballerina executables
function Find-Ballerina {
    Write-Host "Looking for Ballerina installation..." -ForegroundColor Cyan
    
    # Try to find bal.exe in Program Files
    $programFiles = @(
        "C:\Program Files\Ballerina",
        "C:\Program Files (x86)\Ballerina",
        "C:\Ballerina"
    )
    
    foreach ($dir in $programFiles) {
        if (Test-Path $dir) {
            $versions = Get-ChildItem -Path $dir -Directory
            foreach ($version in $versions) {
                $balPath = Join-Path -Path $version.FullName -ChildPath "bin\bal.exe"
                if (Test-Path $balPath) {
                    return $balPath
                }
            }
        }
    }
    
    # Ask user for direct input if not found
    Write-Host "Ballerina executable not found in common locations." -ForegroundColor Yellow
    Write-Host "Do you know where Ballerina is installed?" -ForegroundColor Cyan
    $response = Read-Host "Enter 'Y' for Yes, or any other key to exit"
    
    if ($response.ToUpper() -eq "Y") {
        $customPath = Read-Host "Please enter the full path to the Ballerina bin directory (e.g., C:\Path\to\Ballerina\bin)"
        $balExe = Join-Path -Path $customPath -ChildPath "bal.exe"
        
        if (Test-Path $balExe) {
            return $balExe
        } else {
            Write-Host "Invalid path. Could not find bal.exe at the specified location." -ForegroundColor Red
            return $null
        }
    }
    
    return $null
}

# Main script
Clear-Host
Write-Host "==== Ballerina Runner ====" -ForegroundColor Cyan

$balExePath = Find-Ballerina

if ($balExePath) {
    Write-Host "`nFound Ballerina at: $balExePath" -ForegroundColor Green
    
    # Navigate to project directory
    $projectDir = "F:\hackthon\Ballerina\Healthcare\Healthcare"
    
    if (Test-Path $projectDir) {
        Set-Location -Path $projectDir
        Write-Host "Changed directory to: $projectDir" -ForegroundColor Yellow
        
        # Run Ballerina
        Write-Host "`nRunning Ballerina application..." -ForegroundColor Cyan
        Write-Host "Command: & `"$balExePath`" run`n" -ForegroundColor Yellow
        
        & $balExePath run
        
        $exitCode = $LASTEXITCODE
        
        if ($exitCode -ne 0) {
            Write-Host "`nBallerina execution failed with exit code: $exitCode" -ForegroundColor Red
        } else {
            Write-Host "`nBallerina execution completed successfully." -ForegroundColor Green
        }
    } else {
        Write-Host "Project directory not found: $projectDir" -ForegroundColor Red
    }
} else {
    Write-Host "`nCould not locate Ballerina. Please install it from https://ballerina.io/downloads/" -ForegroundColor Red
}

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Script to find Ballerina installation

Write-Host "Searching for Ballerina installation..." -ForegroundColor Cyan

# Common installation locations to check
$commonLocations = @(
    "C:\Program Files\Ballerina",
    "C:\Program Files (x86)\Ballerina",
    "C:\Ballerina",
    "$env:USERPROFILE\Ballerina"
)

$foundBallerina = $false

foreach ($baseLocation in $commonLocations) {
    if (Test-Path $baseLocation) {
        Write-Host "Checking $baseLocation" -ForegroundColor Yellow
        
        # Get all subdirectories that might be version folders
        $versionDirs = Get-ChildItem -Path $baseLocation -Directory
        
        foreach ($versionDir in $versionDirs) {
            $binPath = Join-Path $versionDir.FullName "bin"
            $balExe = Join-Path $binPath "bal.exe"
            
            if (Test-Path $balExe) {
                Write-Host "Found Ballerina at: $balExe" -ForegroundColor Green
                Write-Host "`nTo run Ballerina, use this command:" -ForegroundColor Cyan
                Write-Host "& `"$balExe`" run" -ForegroundColor Yellow
                
                $foundBallerina = $true
                break
            }
        }
    }
    
    if ($foundBallerina) { break }
}

if (-not $foundBallerina) {
    Write-Host "`nBallerina not found in common locations." -ForegroundColor Red
    Write-Host "Let's search your entire C: drive (this may take some time)..." -ForegroundColor Yellow
    
    Write-Host "Searching for bal.exe in C:\ (press Ctrl+C to cancel if this takes too long)..."
    
    try {
        $balFiles = Get-ChildItem -Path "C:\" -Filter "bal.exe" -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like "*Ballerina*bin*" }
        
        if ($balFiles.Count -gt 0) {
            Write-Host "`nFound Ballerina installation(s):" -ForegroundColor Green
            foreach ($file in $balFiles) {
                Write-Host $file.FullName -ForegroundColor Yellow
                Write-Host "To run Ballerina with this executable, use:" -ForegroundColor Cyan
                Write-Host "& `"$($file.FullName)`" run" -ForegroundColor Yellow
                Write-Host ""
            }
        } else {
            Write-Host "`nCould not find Ballerina installation." -ForegroundColor Red
            Write-Host "Please make sure Ballerina is installed correctly." -ForegroundColor Yellow
            Write-Host "You can download it from: https://ballerina.io/downloads/" -ForegroundColor Cyan
        }
    } catch {
        Write-Host "Error during search: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

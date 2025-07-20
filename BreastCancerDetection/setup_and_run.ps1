Write-Host "Setting up database and history records..." -ForegroundColor Cyan

Set-Location -Path "./server"
Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
npm install

Write-Host "Seeding the database with sample user data and history records..." -ForegroundColor Yellow
npm run seed

Write-Host "Starting the server..." -ForegroundColor Green
Start-Process -FilePath "npm" -ArgumentList "run", "dev"

Set-Location -Path "../frontend"
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install

Write-Host "Starting the frontend application..." -ForegroundColor Green
Start-Process -FilePath "npm" -ArgumentList "run", "dev"

Write-Host "Setup complete! The application is now running." -ForegroundColor Cyan
Write-Host "Visit http://localhost:5173 in your browser to access the application."
Write-Host "Login with:" -ForegroundColor Yellow
Write-Host "  Username: user1" -ForegroundColor White
Write-Host "  Password: password" -ForegroundColor White

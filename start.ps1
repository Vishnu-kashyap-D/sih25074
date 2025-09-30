# Start Krishi Sakhi Application

Write-Host "Starting Krishi Sakhi Application..." -ForegroundColor Green
Write-Host ""

# Start Backend
Write-Host "Starting Backend Server on port 3001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd krishi-sakhi-backend; npm start" -WindowStyle Normal

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend Application on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd krishi-sakhi-frontend; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Krishi Sakhi is starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend API: http://localhost:3001" -ForegroundColor White
Write-Host "Frontend UI: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "The application will open in your browser automatically." -ForegroundColor Gray
Write-Host "To stop, close both PowerShell windows." -ForegroundColor Gray
Write-Host ""
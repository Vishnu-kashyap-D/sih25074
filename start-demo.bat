@echo off
echo Starting Krishi Sakhi Demo...
echo.

:: Start backend in new window
echo Starting Backend Server...
start "Krishi Sakhi Backend" cmd /k "cd krishi-sakhi-backend && npm install && npm start"

:: Wait a moment for backend to initialize
timeout /t 5 /nobreak > nul

:: Start frontend in new window
echo Starting Frontend Application...
start "Krishi Sakhi Frontend" cmd /k "cd krishi-sakhi-frontend && npm install && npm run dev"

echo.
echo ====================================
echo Krishi Sakhi is starting up!
echo ====================================
echo.
echo Backend will run on: http://localhost:3001
echo Frontend will run on: http://localhost:3000
echo.
echo Please wait for both windows to finish loading.
echo The frontend will automatically open in your browser.
echo.
echo To stop the application, close both command windows.
echo.
pause
@echo off
title Nyikwa Oongo Baba Clan App

echo ==========================================
echo Starting Nyikwa Oongo Baba Clan App
echo ==========================================

echo.
echo Starting Backend Server...
cd backend
start "Backend Server" cmd /c "npm install && npm start"

cd ..
echo.
echo Starting Frontend Server...
cd frontend
start "Frontend Server" cmd /c "npm install && npm run dev"

echo.
echo Waiting for servers to initialize...
timeout /t 5 /nobreak > nul

echo Opening the application in your browser...
start http://localhost:5173

echo.
echo Both servers are now running in separate windows.
echo You can close this window.
pause

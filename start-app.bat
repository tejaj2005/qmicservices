@echo off
echo ==========================================
echo      Starting qMicServices Platform
echo ==========================================

echo Starting Backend Server...
start "qMicServices Backend" cmd /k "cd backend && npm run dev"

echo Starting Frontend Application...
start "qMicServices Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both services are launching in separate windows.
echo Frontend will be available at http://localhost:5173
echo Backend will be available at http://localhost:3001
echo.

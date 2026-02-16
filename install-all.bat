@echo off
echo ==========================================
echo   Installing Dependencies for qMicServices
echo ==========================================

echo [1/2] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies!
    pause
    exit /b %errorlevel%
)
cd ..

echo [2/2] Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies!
    pause
    exit /b %errorlevel%
)
cd ..

echo.
echo ==========================================
echo      Success! All dependencies installed.
echo ==========================================
echo You can now run 'start-app.bat' to launch the platform.
pause

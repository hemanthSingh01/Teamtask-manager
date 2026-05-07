@echo off
REM Team Task Manager - Quick Start Script (Windows)
REM This script sets up and runs the application locally

echo.
echo 🚀 Team Task Manager - Local Setup
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js v14+ first.
    exit /b 1
)

echo ✅ Node.js found:
node -v
echo.

echo ⚠️  Make sure MongoDB is running ^(locally or MongoDB Atlas connection^)
echo.

REM Install backend dependencies
echo 📦 Installing backend dependencies...
call npm install
echo ✅ Backend dependencies installed
echo.

REM Create .env if it doesn't exist
if not exist ".env" (
    echo 📝 Creating .env file...
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/teamtaskmanager
        echo JWT_SECRET=dev_super_secret_key_change_in_production
        echo JWT_EXPIRE=7d
        echo NODE_ENV=development
        echo FRONTEND_URL=http://localhost:3000
    ) > .env
    echo ✅ .env file created. Update MONGODB_URI if needed.
) else (
    echo ✅ .env file already exists
)
echo.

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd client
call npm install
cd ..
echo ✅ Frontend dependencies installed
echo.

echo ✅ Setup complete!
echo.
echo 📚 To start the application:
echo.
echo   Terminal 1 - Start Backend:
echo     npm start
echo.
echo   Terminal 2 - Start Frontend:
echo     cd client ^&^& npm run dev
echo.
echo   Then visit: http://localhost:3000
echo.
echo 🔑 Demo Credentials ^(create your own account^):
echo    Email: test@example.com
echo    Password: test123
echo.
pause

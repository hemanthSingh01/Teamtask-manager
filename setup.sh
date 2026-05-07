#!/bin/bash

# Team Task Manager - Quick Start Script
# This script sets up and runs the application locally

echo "🚀 Team Task Manager - Local Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14+ first."
    exit 1
fi

echo "✅ Node.js found: $(node -v)"
echo ""

# Check if MongoDB is available
echo "⚠️  Make sure MongoDB is running (locally or MongoDB Atlas connection)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install
echo "✅ Backend dependencies installed"
echo ""

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/teamtaskmanager
JWT_SECRET=dev_super_secret_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOL
    echo "✅ .env file created. Update MONGODB_URI if needed."
else
    echo "✅ .env file already exists"
fi
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install
echo "✅ Frontend dependencies installed"
cd ..
echo ""

echo "✅ Setup complete!"
echo ""
echo "📚 To start the application:"
echo ""
echo "  Terminal 1 - Start Backend:"
echo "    npm start"
echo ""
echo "  Terminal 2 - Start Frontend:"
echo "    cd client && npm run dev"
echo ""
echo "  Then visit: http://localhost:3000"
echo ""
echo "🔑 Demo Credentials (create your own account):"
echo "   Email: test@example.com"
echo "   Password: test123"
echo ""

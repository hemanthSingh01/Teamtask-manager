#!/bin/bash
set -e
echo "Installing root dependencies..."
npm install

echo "Building client..."
cd client
npm install
npm run build
cd ..

echo "Build complete!"

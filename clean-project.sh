#!/bin/bash

echo "🧹 Cleaning TypeScript project..."

# Remove all JS files from src directory
echo "Removing .js files from src directory..."
find src -name "*.js" -type f -delete
find src -name "*.js.map" -type f -delete

# Clean dist directory
echo "Cleaning dist directory..."
rm -rf dist

# Rebuild
echo "Building TypeScript project..."
npm run build

echo "✅ Project cleaned and rebuilt successfully!"
echo ""
echo "📁 JavaScript files should only exist in:"
echo "   - dist/ (compiled output)"
echo "   - node_modules/ (dependencies)"
echo ""
echo "🚫 JavaScript files should NOT exist in:"
echo "   - src/ (TypeScript source files only)"

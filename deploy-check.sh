#!/bin/bash

echo "Building TypeScript project..."
npm run build

echo "Testing serverless function locally..."
# Install vercel CLI if not already installed
# npm install -g vercel

echo "Please make sure to:"
echo "1. Set all required environment variables in Vercel dashboard"
echo "2. Connect your MongoDB database"
echo "3. Configure CORS origins for your frontend domain"
echo "4. Test the deployment with 'vercel --prod'"

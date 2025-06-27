# Backend Event Management System

This is the backend API for the Event Management System built with Node.js, Express, TypeScript, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Copy environment file:

```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
   - Database URL (MongoDB)
   - JWT Secret
   - Email configuration
   - Cloudinary configuration
   - Midtrans configuration

## Running the Application

### Development Mode

```bash
npm run dev
```

The server will start on http://localhost:3000

### Production Mode

```bash
npm run build
npm start
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:

   - `DATABASE_URL`
   - `SECRET`
   - `EMAIL_SMTP_*` variables
   - `CLIENT_HOST` (your frontend URL)
   - `MIDTRANS_*` variables
   - `CLOUDINARY_*` variables
   - `NODE_ENV=production`

3. Deploy automatically when pushing to main branch

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `DATABASE_URL`: MongoDB connection string
- `SECRET`: JWT secret key
- `CLIENT_HOST`: Your frontend domain (e.g., https://your-app.vercel.app)
- `EMAIL_SMTP_*`: Email configuration
- `MIDTRANS_*`: Payment gateway configuration
- `CLOUDINARY_*`: File upload configuration
- `NODE_ENV`: Set to "production"

### Generate API Documentation

```bash
npm run docs
```

## API Endpoints

The API documentation is available at: http://localhost:3000/api-docs

## Environment Variables

Check `.env.example` for all required environment variables.

## Features

- User Authentication (Register, Login, Profile Management)
- Event Management (CRUD operations)
- Order Management
- Payment Integration with Midtrans
- File Upload with Cloudinary
- Email notifications
- API Documentation with Swagger

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for file storage
- Midtrans for payment processing
- Nodemailer for email services

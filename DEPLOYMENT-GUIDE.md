# Vercel Deployment Fix - Backend Event Management

## Issue Fixed

Fixed `FUNCTION_INVOCATION_FAILED` error pada deployment Vercel dengan optimisasi berikut:

### 1. Handler Function Optimization

- Mengubah global app instance menjadi factory pattern
- Implementasi database connection caching untuk serverless
- Proper error handling untuk Vercel environment

### 2. Database Connection Optimization

- Implementasi connection pooling untuk MongoDB
- Global connection caching untuk serverless functions
- Optimized connection timeouts dan pool size

### 3. Vercel Configuration Updates

- Updated `vercel.json` dengan routes yang benar
- Ditambahkan rewrites untuk API routes
- Optimized function configuration

## Environment Variables Required

Set the following environment variables di Vercel dashboard:

```
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/
SECRET=your-jwt-secret-key
CLIENT_HOST=https://your-frontend-domain.vercel.app
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
MIDTRANS_CLIENT_KEY=your-midtrans-client-key
MIDTRANS_SERVER_KEY=your-midtrans-server-key
MIDTRANS_TRANSACTION_URL=https://api.sandbox.midtrans.com/v2
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=465
EMAIL_SMTP_USER=your-email@gmail.com
EMAIL_SMTP_PASS=your-app-password
EMAIL_SMTP_SECURE=true
EMAIL_SMTP_SERVICE_NAME=gmail
```

## Deployment Steps

1. Commit and push perubahan ke Git repository
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy with `vercel --prod`

## Testing

- Local build: `npm run build`
- Local test: `npm run dev`
- Production deploy: `vercel --prod`

## Important Notes

- Database harus accessible dari Vercel (whitelist 0.0.0.0/0 di MongoDB Atlas)
- CORS origins harus include domain Vercel frontend
- File size limit 50MB untuk serverless functions
- Function timeout diset ke 30 detik

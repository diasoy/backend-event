# 🚀 Vercel Deployment Guide

## ✅ Ready for Vercel Deployment

Project ini telah dikonfigurasi dan siap untuk deployment di Vercel dengan optimasi berikut:

### 🔧 **Konfigurasi Deployment**

1. **Vercel Configuration** (`vercel.json`)
   - Simplified configuration untuk serverless functions
   - Maximum duration 30 detik
   - Entry point: `src/index.ts`

2. **Package.json Optimization**
   - Dependencies dipisah dengan devDependencies
   - Build scripts optimized untuk Vercel
   - Clean scripts untuk maintenance

3. **Handler Function**
   - Serverless-compatible Express handler
   - CORS headers untuk cross-origin requests
   - Error handling yang robust
   - Database connection caching

### 📋 **Environment Variables (Required)**

Set environment variables berikut di Vercel Dashboard:

```bash
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/

# JWT
SECRET=your-jwt-secret-key

# Client/Frontend
CLIENT_HOST=https://your-frontend-domain.vercel.app

# Email SMTP
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=465
EMAIL_SMTP_USER=your-email@gmail.com
EMAIL_SMTP_PASS=your-app-password
EMAIL_SMTP_SECURE=true
EMAIL_SMTP_SERVICE_NAME=gmail

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Midtrans Payment
MIDTRANS_CLIENT_KEY=your-client-key
MIDTRANS_SERVER_KEY=your-server-key
MIDTRANS_TRANSACTION_URL=https://api.sandbox.midtrans.com/v2
```

### 🚀 **Deployment Steps**

1. **Connect to Vercel**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   # Deploy to preview
   vercel
   
   # Deploy to production
   vercel --prod
   ```

3. **Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add all required environment variables

### 🔍 **Testing Deployment**

1. **Local Build Test**
   ```bash
   npm run clean:build
   ```

2. **Local Dev Test**
   ```bash
   npm run dev
   ```

3. **Production Test**
   - Test all API endpoints
   - Verify database connection
   - Check CORS functionality
   - Test file uploads (if any)

### 🛠️ **Troubleshooting**

#### Common Issues:

1. **Database Connection Error**
   - Verify `DATABASE_URL` is set correctly
   - Ensure MongoDB Atlas allows connections from `0.0.0.0/0`
   - Check database name in connection string

2. **CORS Issues**
   - Add your frontend domain to CORS configuration
   - Update `CLIENT_HOST` environment variable

3. **Function Timeout**
   - Check function duration in Vercel logs
   - Optimize database queries
   - Consider adding connection pooling

4. **Environment Variables**
   - Ensure all required env vars are set in Vercel Dashboard
   - No quotes needed in Vercel env vars
   - Restart deployment after adding env vars

### 📊 **Performance Optimization**

- ✅ Database connection caching
- ✅ Serverless function optimization
- ✅ Minimal dependencies in production
- ✅ CORS pre-configured
- ✅ Error handling implemented

### 🔗 **Useful Links**

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [MongoDB Atlas](https://cloud.mongodb.com)

---

**Status**: ✅ Ready for Production Deployment

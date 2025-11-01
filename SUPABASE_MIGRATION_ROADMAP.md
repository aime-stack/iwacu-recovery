# 🚀 Supabase Migration Roadmap - Iwacu Recovery Centre

## Overview
This document outlines the complete migration from local PostgreSQL to Supabase (PostgreSQL + Storage + Auth) while maintaining Prisma ORM.

---

## 📋 Phase 1: Setup & Configuration

### 1.1 Supabase Project Setup
- [ ] Create Supabase project at https://supabase.com
- [ ] Note down the following credentials:
  - Project URL (e.g., `https://xxxxx.supabase.co`)
  - Anon/Public Key
  - Service Role Key (keep secret!)
  - Database Password
  - Direct Connection String (for Prisma migrations)

### 1.2 Environment Variables
Update `.env.local` with:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Prisma Database Connection (Supabase Postgres)
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1

# Existing Variables (keep if needed)
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

### 1.3 Install Dependencies
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

---

## 📋 Phase 2: Database Schema Migration

### 2.1 Update Prisma Schema
- Update models to include image storage URLs
- Ensure compatibility with Supabase Postgres
- Add proper indexes for performance

### 2.2 Run Migrations
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to Supabase (or create migration)
npx prisma db push
# OR
npx prisma migrate dev --name supabase_migration
```

### 2.3 Data Migration (if you have existing data)
- Export data from current PostgreSQL database
- Import to Supabase using pg_dump/pg_restore or Supabase dashboard
- Verify data integrity

---

## 📋 Phase 3: Authentication Migration

### 3.1 Migrate Staff Users to Supabase Auth
- Create migration script to:
  1. Read existing `StaffUser` records
  2. Create Supabase Auth users
  3. Maintain role assignments
- Update `StaffUser` model to reference Supabase Auth users (optional: store `authId`)

### 3.2 Update Auth Flow
- Replace JWT-based auth with Supabase Auth
- Update `/api/auth/route.ts` to use Supabase sign-in
- Update middleware to verify Supabase sessions
- Update logout endpoint

### 3.3 Protect API Routes
- Add Supabase Auth middleware to protected routes
- Update admin routes to verify Supabase sessions

---

## 📋 Phase 4: File Storage Integration

### 4.1 Create Supabase Storage Buckets
Create the following buckets in Supabase Dashboard:
- `articles` - for article images
- `gallery` - for gallery images
- `uploads` - for general file uploads

### 4.2 Set Bucket Policies
- Public read access for `articles` and `gallery`
- Authenticated write access for staff
- Configure CORS if needed

### 4.3 Implement Storage Helpers
- Create utility functions for:
  - Image upload
  - Image deletion
  - URL generation
  - Image optimization (optional: using Supabase Transformations)

---

## 📋 Phase 5: API Route Updates

### 5.1 Articles API (`/api/articles`)
- **GET** - List all articles (public)
- **GET** `[id]` - Get single article
- **POST** - Create article with image upload (admin only)
- **PATCH** `[id]` - Update article (admin only)
- **DELETE** `[id]` - Delete article + image (admin only)

### 5.2 Gallery API (`/api/gallery`)
- **GET** - List gallery images by category
- **POST** - Upload gallery image (admin only)
- **PATCH** `[id]` - Update image metadata (admin only)
- **DELETE** `[id]` - Delete image from storage + DB (admin only)

### 5.3 Appointments API (`/api/appointments`)
- **GET** - List appointments (admin only)
- **POST** - Create appointment (public)
- **PATCH** `[id]` - Update appointment status (admin only)

### 5.4 Messages API (`/api/contact`)
- **POST** - Submit contact message (public)
- **GET** - List messages (admin only) - Already at `/api/admin/messages`

---

## 📋 Phase 6: Docker & Production Setup

### 6.1 Create Dockerfile
- Multi-stage build for optimization
- Include Prisma generation in build
- Set up proper environment variables

### 6.2 Create docker-compose.yml (for local development)
- Optional: Local Supabase setup for testing
- Or connect to cloud Supabase

### 6.3 Update Build Scripts
- Ensure Prisma generates before build
- Add health checks if needed

---

## 📋 Phase 7: Testing & Validation

### 7.1 Local Testing
- [ ] Test database connection
- [ ] Test authentication flow
- [ ] Test image uploads
- [ ] Test all CRUD operations
- [ ] Verify middleware protection

### 7.2 Production Deployment
- [ ] Deploy to Vercel/Supabase
- [ ] Set environment variables
- [ ] Run database migrations
- [ ] Test production endpoints
- [ ] Monitor error logs

---

## 📋 Phase 8: Production Optimizations

### 8.1 Performance
- [ ] Enable Supabase Edge Functions for heavy operations (optional)
- [ ] Implement image optimization/CDN
- [ ] Add database indexes for frequently queried fields
- [ ] Set up connection pooling (PgBouncer)

### 8.2 Monitoring & Logging
- [ ] Set up Supabase logging/monitoring
- [ ] Add error tracking (Sentry, etc.)
- [ ] Monitor API usage and limits

### 8.3 Security
- [ ] Review Row Level Security (RLS) policies
- [ ] Set up API rate limiting
- [ ] Review storage bucket policies
- [ ] Enable Supabase Auth email templates

### 8.4 Additional Integrations (Optional)
- [ ] Email notifications (Supabase Edge Functions + Resend/SendGrid)
- [ ] Webhooks for appointment confirmations
- [ ] Analytics integration (Google Analytics, Plausible)
- [ ] Backup automation

---

## 🔄 Migration Checklist

### Pre-Migration
- [ ] Backup current database
- [ ] Document current data volume
- [ ] Test Supabase connection locally

### During Migration
- [ ] Update Prisma schema
- [ ] Run migrations
- [ ] Migrate authentication data
- [ ] Update all API routes
- [ ] Test each endpoint

### Post-Migration
- [ ] Verify all data migrated correctly
- [ ] Test authentication flows
- [ ] Test file uploads/downloads
- [ ] Monitor for errors
- [ ] Update documentation

---

## 📚 Key Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Prisma with Supabase](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-supabase)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)

---

## ⚠️ Important Notes

1. **Connection Strings**: Use `DIRECT_URL` for Prisma migrations and `DATABASE_URL` with PgBouncer for application connections.

2. **Storage Limits**: Be aware of Supabase storage limits on free tier (1GB). Plan for image optimization.

3. **Auth Migration**: Existing passwords cannot be migrated directly. You'll need to:
   - Option A: Reset all passwords and send reset emails
   - Option B: Create a migration script that creates users and sends password reset links

4. **Environment Variables**: Never commit `.env.local` or service role keys to git.

5. **RLS Policies**: Consider setting up Row Level Security for extra data protection.

---

## 🎯 Success Criteria

✅ All API endpoints functional  
✅ Authentication working with Supabase  
✅ Images uploading to Supabase Storage  
✅ All data migrated successfully  
✅ Application deployable to production  
✅ Docker setup working  
✅ Environment variables documented  

---

**Last Updated**: {{ Date }}
**Next Review**: After Phase 1 completion


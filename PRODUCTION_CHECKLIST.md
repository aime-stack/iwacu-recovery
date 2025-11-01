# 🚀 Production Deployment Checklist

This checklist ensures your Iwacu Recovery Centre application is ready for production.

## Pre-Deployment

### 1. Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Service role key (keep secret!)
- [ ] `DIRECT_URL` - Direct database connection for Prisma
- [ ] `DATABASE_URL` - Pooled database connection
- [ ] `JWT_SECRET` - JWT secret (if still used)
- [ ] `NODE_ENV` - Set to `production`

### 2. Supabase Setup
- [ ] Database migrations run successfully
- [ ] Storage buckets created:
  - [ ] `articles` bucket (public read, authenticated write)
  - [ ] `gallery` bucket (public read, authenticated write)
- [ ] Storage policies configured
- [ ] Row Level Security (RLS) policies reviewed
- [ ] Staff users migrated to Supabase Auth

### 3. Database
- [ ] All migrations applied
- [ ] Database indexes created
- [ ] Connection pooling configured
- [ ] Backup strategy in place
- [ ] Data verified and migrated

### 4. Security
- [ ] Service role key never exposed to client
- [ ] CORS configured correctly
- [ ] API routes protected with authentication
- [ ] Environment variables secured
- [ ] SSL/TLS enabled
- [ ] Rate limiting considered

## Deployment Platforms

### Vercel Deployment

1. **Connect Repository**
   - [ ] Link GitHub/GitLab repository
   - [ ] Configure build settings

2. **Environment Variables**
   - [ ] Add all required environment variables in Vercel dashboard
   - [ ] Verify sensitive variables are marked as secret

3. **Build Configuration**
   ```json
   {
     "buildCommand": "prisma generate && next build",
     "installCommand": "npm ci",
     "framework": "nextjs"
   }
   ```

4. **Post-Deploy**
   - [ ] Run migrations: `npx prisma migrate deploy`
   - [ ] Verify API routes work
   - [ ] Test authentication
   - [ ] Check image uploads

### Docker Deployment

1. **Build Image**
   ```bash
   docker build -t iwacu-recovery .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_SUPABASE_URL=... \
     -e SUPABASE_SERVICE_ROLE_KEY=... \
     -e DIRECT_URL=... \
     iwacu-recovery
   ```

3. **Verify**
   - [ ] Container starts successfully
   - [ ] Application accessible
   - [ ] Database connects
   - [ ] Storage works

### Supabase Hosting (Optional)

- [ ] Configure Edge Functions if needed
- [ ] Set up webhooks for notifications
- [ ] Configure custom domains

## Testing Checklist

### Functional Tests
- [ ] User can view articles
- [ ] Admin can create/edit/delete articles
- [ ] Gallery images display correctly
- [ ] Admin can upload gallery images
- [ ] Appointments can be created (public)
- [ ] Admin can view/manage appointments
- [ ] Contact messages can be submitted
- [ ] Admin can view/mark messages as read
- [ ] Authentication works for staff
- [ ] Protected routes redirect to login

### Performance Tests
- [ ] Page load times acceptable
- [ ] Image optimization working
- [ ] Database queries optimized
- [ ] API response times reasonable
- [ ] No memory leaks

### Security Tests
- [ ] Unauthorized access blocked
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] File upload validation
- [ ] Rate limiting active

## Monitoring & Logging

### Set Up Monitoring
- [ ] Error tracking (Sentry, LogRocket, etc.)
- [ ] Performance monitoring
- [ ] Uptime monitoring
- [ ] Database query monitoring
- [ ] API usage tracking

### Logging
- [ ] Application logs configured
- [ ] Error logs accessible
- [ ] Supabase logs monitored
- [ ] Log retention policy set

## Performance Optimizations

### Image Optimization
- [ ] Images uploaded to Supabase Storage
- [ ] Image compression enabled
- [ ] CDN configured (Supabase Storage provides CDN)
- [ ] Lazy loading implemented
- [ ] Responsive images configured

### Database Optimization
- [ ] Indexes created on frequently queried fields
- [ ] Connection pooling enabled
- [ ] Query optimization done
- [ ] Unused data archived

### Code Optimization
- [ ] Next.js production build
- [ ] Code splitting enabled
- [ ] Unused dependencies removed
- [ ] Bundle size optimized

## Backup & Recovery

### Backup Strategy
- [ ] Database backups automated
- [ ] Backup frequency defined (daily recommended)
- [ ] Backup retention policy set
- [ ] Backup restoration tested

### Recovery Plan
- [ ] Disaster recovery plan documented
- [ ] Rollback procedure tested
- [ ] Data recovery process verified

## Additional Integrations (Optional)

### Email Notifications
- [ ] Email service configured (Resend, SendGrid, etc.)
- [ ] Appointment confirmation emails
- [ ] Contact form notification emails
- [ ] Password reset emails working

### Analytics
- [ ] Analytics service integrated (Google Analytics, Plausible)
- [ ] Privacy-compliant tracking
- [ ] Conversion tracking set up

### Webhooks
- [ ] Appointment webhooks configured
- [ ] Donation webhooks configured
- [ ] Error webhooks set up

## Documentation

### User Documentation
- [ ] Admin panel usage guide
- [ ] Article management guide
- [ ] Gallery management guide
- [ ] User roles documented

### Technical Documentation
- [ ] API documentation
- [ ] Database schema documented
- [ ] Environment variables documented
- [ ] Deployment process documented

## Post-Launch

### Week 1
- [ ] Monitor error logs daily
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Fix critical issues

### Month 1
- [ ] Review analytics
- [ ] Optimize based on usage
- [ ] Security audit
- [ ] Performance review

## Support & Maintenance

- [ ] Support channels established
- [ ] Issue tracking system set up
- [ ] Update process documented
- [ ] Maintenance schedule planned

---

## Quick Commands Reference

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Test database connection
npx prisma db pull

# View database (Prisma Studio)
npx prisma studio

# Build for production
npm run build

# Start production server
npm start

# Docker commands
docker build -t iwacu-recovery .
docker run -p 3000:3000 --env-file .env.local iwacu-recovery
```

---

**Last Updated**: {{ Date }}
**Status**: Ready for Production ✓


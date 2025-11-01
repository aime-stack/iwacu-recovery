# 📦 Data Migration Guide - PostgreSQL to Supabase

This guide will help you migrate your existing PostgreSQL data to Supabase.

## Prerequisites

1. Access to your current PostgreSQL database
2. Supabase project created and credentials available
3. `pg_dump` and `pg_restore` tools (or use Supabase dashboard)

## Method 1: Using Supabase Dashboard (Recommended for small datasets)

### Step 1: Export Data from Current Database

1. Connect to your current PostgreSQL database
2. Use Supabase dashboard SQL Editor or pgAdmin to export:
   - Navigate to Supabase Dashboard > SQL Editor
   - Run queries to export data:

```sql
-- Export StaffUser data (note: passwords cannot be migrated)
SELECT * FROM "StaffUser";

-- Export all other tables
SELECT * FROM "Article";
SELECT * FROM "GalleryImage";
SELECT * FROM "Appointment";
SELECT * FROM "ContactMessage";
SELECT * FROM "Donation";
SELECT * FROM "Subscription";
```

### Step 2: Import to Supabase

1. Run migrations first:
```bash
npx prisma migrate dev
# or
npx prisma db push
```

2. Import data via Supabase SQL Editor or use the import scripts below

## Method 2: Using pg_dump/pg_restore (Recommended for large datasets)

### Step 1: Export Current Database

```bash
# Export schema and data
pg_dump -h your-host -U your-user -d your-database -F c -f backup.dump

# Or export as SQL
pg_dump -h your-host -U your-user -d your-database > backup.sql
```

### Step 2: Restore to Supabase

```bash
# Using pg_restore (for .dump files)
pg_restore -h db.xxxxx.supabase.co -U postgres -d postgres backup.dump

# Or using psql (for .sql files)
psql -h db.xxxxx.supabase.co -U postgres -d postgres < backup.sql
```

**Note**: You'll need to use the Supabase database password. Get the connection string from Supabase Dashboard.

## Method 3: Using Prisma Studio (Manual Migration)

1. Open your current database with Prisma Studio:
```bash
npx prisma studio
```

2. Open Supabase database with Prisma Studio:
```bash
# Update .env.local with Supabase connection string
npx prisma studio
```

3. Manually copy data between instances

## Migration Scripts

### Staff User Migration (Auth Migration)

Since passwords cannot be directly migrated to Supabase Auth, use this script:

```typescript
// scripts/migrate-users.ts
import { createSupabaseAdminClient } from '../src/lib/supabase'
import { prisma } from '../src/lib/prisma'

async function migrateUsers() {
  // Get all staff users from old database
  const oldUsers = await oldPrisma.staffUser.findMany()
  
  for (const user of oldUsers) {
    try {
      // Create Supabase Auth user (will send password reset email)
      const supabase = createSupabaseAdminClient()
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        email_confirm: true,
        // Users will need to reset their password
      })
      
      if (error) {
        console.error(`Failed to migrate ${user.email}:`, error)
        continue
      }
      
      // Update StaffUser with Supabase ID
      await prisma.staffUser.update({
        where: { email: user.email },
        data: { supabaseId: data.user.id },
      })
      
      console.log(`Migrated user: ${user.email}`)
    } catch (error) {
      console.error(`Error migrating user ${user.email}:`, error)
    }
  }
}

migrateUsers()
```

**Important**: After migration, send password reset emails to all staff users.

### Gallery Images Migration

If you have existing images in local storage or another service:

```typescript
// scripts/migrate-gallery.ts
import { uploadToSupabaseStorage } from '../src/lib/supabase-storage'
import { prisma } from '../src/lib/prisma'
import fs from 'fs'
import path from 'path'

async function migrateGalleryImages() {
  const images = await prisma.galleryImage.findMany({
    where: {
      storagePath: null, // Only migrate images without storage path
    },
  })
  
  for (const image of images) {
    try {
      // If image is from public folder, upload to Supabase
      if (image.src.startsWith('/')) {
        const filePath = path.join(process.cwd(), 'public', image.src)
        const fileBuffer = fs.readFileSync(filePath)
        const fileName = path.basename(image.src)
        
        const result = await uploadToSupabaseStorage({
          bucket: 'gallery',
          path: `migrated/${fileName}`,
          file: fileBuffer,
          contentType: 'image/jpeg',
        })
        
        // Update database record
        await prisma.galleryImage.update({
          where: { id: image.id },
          data: {
            imageUrl: result.url,
            storagePath: result.path,
            src: result.url, // Update legacy field
          },
        })
        
        console.log(`Migrated image: ${image.title}`)
      }
    } catch (error) {
      console.error(`Error migrating image ${image.id}:`, error)
    }
  }
}

migrateGalleryImages()
```

## Verification Checklist

After migration, verify:

- [ ] All tables exist in Supabase
- [ ] Data counts match between old and new databases
- [ ] Staff users can log in (after password reset)
- [ ] Articles display correctly
- [ ] Gallery images load from Supabase Storage
- [ ] Appointments and messages are accessible
- [ ] Admin panel works correctly

## Rollback Plan

If migration fails:

1. Keep backup of original database
2. Revert environment variables
3. Restore from backup if needed
4. Document issues for retry

## Post-Migration Tasks

1. **Update Staff Passwords**: Send password reset emails to all staff
2. **Verify Images**: Check that all images migrated correctly
3. **Test APIs**: Test all CRUD operations
4. **Monitor Logs**: Check for errors in Supabase logs
5. **Update Documentation**: Document any custom migration steps

## Support

For issues during migration:
- Check Supabase Dashboard logs
- Review Prisma migration output
- Verify connection strings
- Ensure storage buckets are created


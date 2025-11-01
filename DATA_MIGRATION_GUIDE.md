# 📊 Data Migration Guide - Import Existing Data

Since your Supabase database tables are empty, you need to import your existing data first. Here are the options:

## Option 1: Seed Gallery Data from JSON (Easiest)

You already have `gallery.json` file. Use the updated seed script:

```bash
node scripts/seed-gallery.js gallery.json
```

This will:
- Read gallery data from `gallery.json`
- Create database records in Supabase
- Set `imageUrl` to match `src` (temporary, will be updated by image migration)

After seeding, run image migration:
```bash
npm run migrate:images
```

## Option 2: Migrate from Old Database

If you have an old PostgreSQL database with your data:

1. **Add old database URL to `.env`:**
```env
OLD_DATABASE_URL=postgresql://user:password@host:port/database
```

2. **Run data migration:**
```bash
node scripts/migrate-data.js
```

3. **Then migrate images:**
```bash
npm run migrate:images
```

## Option 3: Manual SQL Import

If you have SQL dumps or CSV files:

1. Go to **Supabase Dashboard → SQL Editor**
2. Paste your SQL INSERT statements
3. Or use the Table Editor to import CSV files

## Option 4: pg_dump/pg_restore (For Large Datasets)

If you have a PostgreSQL dump file:

```bash
# Restore to Supabase
psql "postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres" < dump.sql
```

## Quick Start: Seed Gallery Now

**For gallery images, the fastest way:**

```bash
# Step 1: Seed gallery data from JSON
node scripts/seed-gallery.js gallery.json

# Step 2: Migrate images to Supabase Storage
npm run migrate:images
```

This will:
1. Create all gallery records in database
2. Upload images from `/public/gallery/` to Supabase Storage
3. Update records with Supabase Storage URLs

---

## Verify After Migration

Check your data in Supabase Dashboard:
- **Table Editor** → Check `GalleryImage` table
- **Storage** → Check `gallery` bucket for uploaded images

Then test in your app:
```bash
npm run dev
```


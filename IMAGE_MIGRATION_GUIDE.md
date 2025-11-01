# 🖼️ Image Migration Guide - Local to Supabase Storage

This guide will help you migrate all your existing images from the `/public` folder to Supabase Storage buckets.

## 📋 Prerequisites

✅ Supabase project created  
✅ Storage buckets created:
- `gallery` - For GalleryImage images
- `news` - For News featured images
- `partners` - For Partner logos
- `schools` - For School logos/images
- `team` - For Team photos
- `images` - For generic images
- `articles` - For Article featured images

✅ Database schema migrated (Phase 2 complete)  
✅ `.env` file configured with Supabase credentials

## 🚀 Step-by-Step Migration

### Step 1: Verify Your Buckets Exist

Go to Supabase Dashboard → Storage and verify all buckets are created and configured:

- **Public Read Access**: Enable for all buckets
- **Authenticated Write**: Enable for all buckets (for admin uploads)

### Step 2: Ensure Environment Variables Are Set

Make sure your `.env` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DIRECT_URL=your_database_connection_string
```

### Step 3: Run the Migration Script

```bash
npm run migrate:images
```

Or directly:

```bash
node scripts/migrate-images-to-supabase.js
```

### Step 4: What the Script Does

The migration script will:

1. **Scan database records** for images with local paths (starting with `/`)
2. **Find corresponding files** in the `/public` folder
3. **Upload each image** to the appropriate Supabase Storage bucket:
   - `GalleryImage` → `gallery` bucket
   - `Article` → `articles` bucket
   - `News` → `news` bucket (if News model exists)
   - `Partner` → `partners` bucket (if Partner model exists)
   - `Team` → `team` bucket (if Team model exists)
   - `School` → `schools` bucket (if School model exists)
   - `Image` → `images` bucket (if Image model exists)
4. **Update database records** with:
   - New Supabase Storage URL (`imageUrl`)
   - Storage path (`storagePath`)
   - Legacy field updates (`src` for GalleryImage)

### Step 5: Verify Migration

After migration completes:

1. **Check Supabase Storage**: Go to Storage → Browse files in each bucket
2. **Verify database**: Check that `imageUrl` and `storagePath` fields are populated
3. **Test application**: Start your dev server and verify images load correctly

```bash
npm run dev
```

## 📂 Image Path Mapping

The script handles these path mappings:

| Local Path | Bucket | Model |
|-----------|--------|-------|
| `/gallery/*.jpg` | `gallery` | `GalleryImage` |
| `/news/*.jpg` | `news` | `News` |
| `/partners/*.png` | `partners` | `Partner` |
| `/school/*.jpg` | `schools` | `School` |
| `/team/*.jpg` | `team` | `Team` |
| `/images/*.jpg` | `images` | `Image` |
| Article images | `articles` | `Article` |

## ⚠️ Important Notes

1. **Backup First**: Consider backing up your database before running migration
2. **Skip Already Migrated**: The script skips images that already have `storagePath` set
3. **Missing Files**: If a file is not found in `/public`, the script will skip it and continue
4. **Preserve Original Data**: Original `src` paths are preserved in legacy fields where applicable
5. **Idempotent**: You can run the script multiple times safely - it won't duplicate uploads

## 🔍 Troubleshooting

### Error: "Missing Supabase credentials"
- Check that `.env` file has `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

### Error: "Bucket does not exist"
- Go to Supabase Dashboard → Storage
- Create the missing bucket
- Ensure it's set to public read access

### Error: "File not found"
- The script will skip missing files and continue
- Check that images are in the correct `/public` subfolders
- Verify database paths match actual file locations

### Images not displaying after migration
- Check Supabase Storage bucket permissions (must be public)
- Verify `imageUrl` field is updated in database
- Clear browser cache
- Check browser console for CORS errors

## 📊 Migration Output

The script will output:

```
🚀 Starting Image Migration to Supabase Storage...

📸 Migrating Gallery Images...
Found 25 gallery images to migrate
  Uploading to gallery/migrated/1-event1.jpg...
  ✓ Migrated: Annual Recovery Celebration
  ...
✅ Gallery images migration complete

📰 Migrating Articles...
Found 5 articles with images to migrate
  ✓ Migrated: Article Title
...
✅ All migrations complete!
```

## 🔄 After Migration

### Optional: Remove Local Images

After verifying everything works, you can optionally remove local images:

```bash
# Backup first!
cp -r public public-backup

# Then remove migrated folders
# Keep this as a backup until you're 100% sure everything works
```

### Keep Local Images as Backup

It's recommended to keep local images as backup for at least a few weeks until you're confident everything is working.

## 📝 Next Steps

After successful migration:

1. ✅ Test all image displays in your application
2. ✅ Verify admin uploads work correctly
3. ✅ Check image URLs in database
4. ✅ Monitor Supabase Storage usage
5. ✅ Update any hardcoded image paths in your code

## 🆘 Need Help?

If migration fails:

1. Check the error message
2. Verify Supabase credentials
3. Ensure buckets exist and are accessible
4. Check file permissions in `/public` folder
5. Review Supabase Storage logs in dashboard

---

**Ready to migrate?** Run: `npm run migrate:images`


# 🔧 How to Fix Database Connection Error

## Current Error
```
Can't reach database server at db.xxxxx.supabase.co:5432
```

## Root Cause
Your `.env` file has connection strings using **port 5432**, which requires IP whitelisting in Supabase.

## ✅ Solution: Use Port 6543 (Transaction Mode)

Port 6543 uses Supabase's connection pooler and **doesn't require IP whitelisting** - it works from anywhere!

### Step-by-Step Fix:

#### 1. Get the Correct Connection String

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll to **Connection string**
5. Select **Transaction** mode (NOT Direct or Session)
6. Copy the connection string - it should look like:
   ```
   postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
   **Important**: It must have `:6543` (not `:5432`)

#### 2. Update Your `.env` File

Open your `.env` file and update both `DIRECT_URL` and `DATABASE_URL`:

```env
# Use Transaction mode (port 6543) - No IP restrictions needed!
DIRECT_URL=postgresql://postgres.[YOUR_PROJECT_REF]:[YOUR_PASSWORD]@aws-0-[YOUR_REGION].pooler.supabase.com:6543/postgres

DATABASE_URL=postgresql://postgres.[YOUR_PROJECT_REF]:[YOUR_PASSWORD]@aws-0-[YOUR_REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

**Replace:**
- `[YOUR_PROJECT_REF]` - Your project reference (e.g., `cfltynmresooyimhrjdm`)
- `[YOUR_PASSWORD]` - Your database password
- `[YOUR_REGION]` - Your region (e.g., `us-east-1`)

#### 3. Test the Connection

Run the test script:
```bash
npm run test:db
```

You should see:
```
✅ Connection successful!
✅ Database connection test passed!
```

#### 4. Run the Migration

Once the connection test passes:
```bash
npm run migrate:images
```

## 🔍 Quick Diagnosis

If you're not sure which connection string format you have, check:

- ✅ **Good** (port 6543): `...pooler.supabase.com:6543/postgres`
- ❌ **Bad** (port 5432): `...db.supabase.co:5432` or `...pooler.supabase.com:5432`

## 📝 Alternative: Whitelist Your IP (Not Recommended)

If you must use port 5432:

1. Go to Supabase Dashboard → Settings → Database → Network Restrictions
2. Add your current IP address
3. Or enable "Allow connections from anywhere" (less secure)

**But it's much easier to just use port 6543!**

## ✅ After Fixing

Once you've updated your `.env` file:
1. Test: `npm run test:db`
2. Migrate: `npm run migrate:images`

The migration will upload all images from `/public` to Supabase Storage and update database records.


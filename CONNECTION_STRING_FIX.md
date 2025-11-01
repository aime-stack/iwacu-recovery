# 🔧 Fixing Supabase Connection String for Prisma

## The Error
```
Error: P1001: Can't reach database server at `db.xxxxx.supabase.co:5432`
```

## Solution

### Step 1: Get the Correct Connection String

1. Go to your Supabase Dashboard
2. Navigate to **Settings** → **Database**
3. Under "Connection string", you'll see several options:
   - **URI** (Session mode) - Use this for Prisma migrations
   - **Transaction mode** - Alternative option

### Step 2: Use the Correct Format

For Prisma migrations, use the **Session mode** connection string:

```
DIRECT_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

OR if you see a format like:
```
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

### Step 3: Common Issues

#### Issue A: Port 5432 Blocked
- **Fix**: Use port 6543 (connection pooler) instead
- **Format**: Add `?pgbouncer=true` at the end

#### Issue B: IP Restrictions
- **Fix**: Go to Supabase Dashboard → Settings → Database → Connection Pooling
- **Enable**: "Allow connections from anywhere" or add your IP to allowlist

#### Issue C: Wrong Format
- Make sure the format is exactly:
  ```
  postgresql://postgres.[PROJECT_REF]:[PASSWORD]@[HOST]:[PORT]/postgres
  ```
- Replace `[PROJECT_REF]`, `[PASSWORD]`, `[HOST]`, and `[PORT]` with actual values

### Step 4: Verify Your .env File

Your `.env` file should have:

```env
# Direct connection for Prisma migrations
DIRECT_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres

# Pooled connection for application (with pgbouncer)
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

### Quick Test

After updating your `.env`, test the connection:

```bash
npx prisma db pull
```

If this works, you can proceed with:

```bash
npx prisma db push
```

## Alternative: Use Supabase Dashboard SQL Editor

If connection issues persist, you can run the migration SQL directly:

1. Go to Supabase Dashboard → SQL Editor
2. Copy the SQL from `prisma/migrations/[latest]/migration.sql`
3. Run it in the SQL Editor

Then run:
```bash
npx prisma db pull  # Syncs Prisma schema with database
npx prisma generate # Regenerates Prisma Client
```


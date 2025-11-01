# ⚡ Quick Fix: Database Connection Issue

## The Error
```
Can't reach database server at aws-1-us-east-1.pooler.supabase.com:5432
```

## Quick Solution

Your `DIRECT_URL` is trying to use port **5432** which requires IP whitelisting.

**Fix: Use port 6543 (Transaction mode) - No IP restrictions needed!**

### Steps:

1. **Go to Supabase Dashboard** → Settings → Database
2. **Click "Connection string"** tab
3. **Select "Transaction" mode** (not Session or Direct)
4. **Copy the connection string** - it should have port **6543**
5. **Update your `.env` file:**

```env
DIRECT_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Format example:**
```
postgresql://postgres.cfltynmresooyimhrjdm:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

6. **Run migration again:**
```bash
npm run migrate:images
```

## Why This Works

- **Port 6543**: Uses Supabase's connection pooler (Transaction mode)
- **No IP restrictions**: Works from anywhere
- **Perfect for migrations**: Handles Prisma queries well

The migration script has been updated to try `DATABASE_URL` if `DIRECT_URL` fails, but it's best to use the correct port (6543) in `DIRECT_URL`.


# 🔧 Database Connection Fix for Migration Scripts

## Problem
Migration scripts can't connect to Supabase database on port 5432.

## Solution

### Option 1: Use Pooled Connection (Recommended - No IP Restrictions)

Update your `.env` file to use port **6543** for `DIRECT_URL`:

```env
# For Prisma queries (use pooled connection with transaction mode)
DIRECT_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1

# Or use the Transaction mode connection string from Supabase Dashboard
```

**Steps:**
1. Go to Supabase Dashboard → Settings → Database
2. Under "Connection string", select **Transaction** mode
3. Copy that connection string
4. Update `DIRECT_URL` in your `.env` file

### Option 2: Allow Your IP Address (For Port 5432)

If you want to use port 5432 (direct connection):

1. Go to Supabase Dashboard → Settings → Database → Network Restrictions
2. Add your current IP address to the allowlist
3. Or enable "Allow connections from anywhere" (less secure)

### Option 3: Use DATABASE_URL Instead

The migration script has been updated to try `DATABASE_URL` if `DIRECT_URL` fails. Make sure both are set correctly:

```env
DIRECT_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

## Quick Fix

**Recommended**: Use Transaction mode connection (port 6543) - no IP restrictions needed!

1. Supabase Dashboard → Settings → Database
2. Copy "Transaction" mode connection string
3. Update `DIRECT_URL` in `.env`
4. Run migration again


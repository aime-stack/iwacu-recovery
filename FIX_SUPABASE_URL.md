# 🔧 Fix Supabase URL Configuration

## Problem
Your `NEXT_PUBLIC_SUPABASE_URL` is set to the dashboard URL instead of the project URL.

**Current (Wrong):**
```
NEXT_PUBLIC_SUPABASE_URL=https://supabase.com/dashboard/iwacu-recovery/cfltynmresooyimhrjdm
```

**Should Be (Correct):**
```
NEXT_PUBLIC_SUPABASE_URL=https://cfltynmresooyimhrjdm.supabase.co
```

## How to Fix

1. Go to your **Supabase Dashboard**
2. Navigate to **Settings** → **API**
3. Find **Project URL** (it looks like: `https://xxxxx.supabase.co`)
4. Copy that URL
5. Update your `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://cfltynmresooyimhrjdm.supabase.co
```

The format should be:
- `https://[PROJECT_REF].supabase.co`
- NOT the dashboard URL (`https://supabase.com/dashboard/...`)

## Quick Fix

Your project reference appears to be: `cfltynmresooyimhrjdm`

So your URL should be:
```
NEXT_PUBLIC_SUPABASE_URL=https://cfltynmresooyimhrjdm.supabase.co
```

After updating, run the migration again:
```bash
npm run migrate:images
```


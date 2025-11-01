# 📊 Complete Data Migration Guide

This guide covers migrating data for **all tables** in your Supabase database.

## ✅ Status Checklist

### Core Content Tables

- [x] **GalleryImage** - ✅ Already migrated (12 records)
- [ ] **Article** - Needs migration if you have existing articles
- [ ] **News** - Needs migration if you have existing news posts
- [ ] **Partner** - Needs migration for partner logos
- [ ] **Team** - Needs migration for team member photos
- [ ] **School** - Needs migration for school data
- [ ] **Image** - Needs migration for generic images

### User-Generated Data Tables

- [ ] **Appointment** - User-submitted appointments (will populate naturally OR migrate existing)
- [ ] **ContactMessage** - Contact form submissions (will populate naturally OR migrate existing)
- [ ] **Donation** - Payment transactions (migrate if you have existing)
- [ ] **Subscription** - Recurring donations (migrate if you have existing)

### System Tables

- [ ] **StaffUser** - Admin users (needs migration to Supabase Auth)

---

## 📝 How to Migrate Each Table

### 1. Article ✅ (Has Seed Script)

If you have articles in JSON format:

```bash
node scripts/seed-articles.js articles.json
```

**JSON Format:**
```json
[
  {
    "title": "Recovery Tips for Families",
    "slug": "recovery-tips-for-families",
    "category": "wellness",
    "excerpt": "Practical ways to support loved ones...",
    "content": "<p>Full HTML content here...</p>",
    "author": "Iwacu Team",
    "published": true,
    "publishedAt": "2025-10-28T10:00:00.000Z"
  }
]
```

**Note:** If articles have images, run image migration after:
```bash
npm run migrate:images
```

---

### 2. News (Create Seed Script)

If you have news posts, create a seed script:

```bash
# Create scripts/seed-news.js (similar to seed-articles.js)
```

Or migrate from old database using the data migration script.

---

### 3. Partner (Partner Logos)

If you have partner data, you can:

**Option A: Manual SQL Import**
```sql
INSERT INTO "Partner" (name, "logoUrl", website, description)
VALUES 
  ('Partner 1', '/partners/partner1.png', 'https://partner1.com', 'Description'),
  ('Partner 2', '/partners/partner2.png', 'https://partner2.com', 'Description');
```

**Option B: Create Seed Script**
```javascript
// scripts/seed-partners.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const partners = [
  { name: 'Partner 1', logoUrl: '/partners/partner1.png', website: 'https://...' },
  // ... more partners
]

async function main() {
  for (const partner of partners) {
    await prisma.partner.create({
      data: {
        ...partner,
        logoUrl: partner.logoUrl, // Will be updated by image migration
      },
    })
  }
}
```

---

### 4. Team (Team Members)

Based on your `/public/team/` folder, create team data:

**Create `scripts/seed-team.js`:**

```javascript
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Director',
    bio: 'Bio text here...',
    photoUrl: '/team/john.jpg',
  },
  // Add all team members from /public/team/
]

async function main() {
  for (const member of teamMembers) {
    await prisma.team.create({
      data: member,
    })
  }
  console.log('Team members seeded!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Then run:
```bash
node scripts/seed-team.js
npm run migrate:images  # Upload team photos
```

---

### 5. School (School Data)

Similar to team, create a seed script if you have school data.

---

### 6. Image (Generic Images)

If you have generic images in `/public/images/`, create seed data for them.

---

## 🔄 User-Generated Data Migration

### Appointment

**If you have existing appointments from old database:**

1. Export from old database
2. Use SQL INSERT or create migration script

**If starting fresh:** These will populate automatically when users submit appointment forms.

---

### ContactMessage

**If you have existing messages:**

Migrate via SQL or data migration script.

**If starting fresh:** These populate automatically from contact forms.

---

### Donation

**If you have existing donations:**

⚠️ **Important:** Only migrate if you need historical data. New donations will come from payment processing.

Migrate via SQL or data migration script.

---

### Subscription

**If you have existing subscriptions:**

⚠️ **Important:** Only migrate active subscriptions. Coordinate with payment provider.

---

## 👤 StaffUser Migration (Critical!)

You need to migrate admin users to Supabase Auth:

### Step 1: Create Migration Script

```javascript
// scripts/migrate-staff-users.js
const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@supabase/supabase-js')

const prisma = new PrismaClient()
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { autoRefreshToken: false, persistSession: false }
  }
)

async function main() {
  const staffUsers = await prisma.staffUser.findMany({
    where: { supabaseId: null }
  })

  for (const user of staffUsers) {
    try {
      // Create Supabase Auth user
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        email_confirm: true,
        // Note: User will need to reset password
      })

      if (error) {
        console.error(`Failed for ${user.email}:`, error.message)
        continue
      }

      // Link to StaffUser
      await prisma.staffUser.update({
        where: { id: user.id },
        data: { supabaseId: data.user.id },
      })

      console.log(`✓ Migrated: ${user.email}`)
      console.log(`  Send password reset email to this user`)
    } catch (error) {
      console.error(`Error migrating ${user.email}:`, error.message)
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

### Step 2: Send Password Reset Emails

After migration, users need to reset passwords. You can trigger this from Supabase Dashboard → Authentication → Users.

---

## 📋 Quick Migration Summary

### For Content (Images/Media):
1. ✅ GalleryImage - Done
2. Run image migration: `npm run migrate:images`
3. Seed other content as needed
4. Run image migration again for new content

### For User Data:
- **Option 1:** Migrate from old database (if you have `OLD_DATABASE_URL`)
- **Option 2:** Let it populate naturally from user interactions
- **Option 3:** Manual SQL import via Supabase Dashboard

### For Staff Users:
- Run staff user migration script
- Send password reset emails
- Test login

---

## 🎯 Recommended Migration Order

1. ✅ **GalleryImage** - Done
2. 📸 **Run Image Migration** - `npm run migrate:images`
3. 📰 **Articles** - Seed if you have articles.json
4. 👥 **Team** - Seed from /public/team/ folder
5. 🤝 **Partners** - Seed from /public/partners/ folder
6. 📅 **Appointments** - Migrate if you have existing data
7. 💬 **Messages** - Migrate if you have existing data
8. 👤 **Staff Users** - Migrate to Supabase Auth
9. 📸 **Run Image Migration Again** - For team, partners, etc.

---

## 🔍 Check What Data You Have

To see what data exists in your old database or files:

```bash
# Check for JSON files
ls *.json

# Check public folders
ls public/team/
ls public/partners/
ls public/news/
ls public/school/
```

Then create appropriate seed scripts based on what you find.

---

## 💡 Pro Tips

1. **Test Image Migration First:** Run `npm run migrate:images` after each content seed to verify uploads work
2. **Verify in Supabase:** Check Table Editor and Storage after each migration
3. **Keep Local Backups:** Don't delete `/public` images until verified
4. **Staff Users:** Test login after migrating staff users

---

**Need help with a specific table?** Let me know which one and I'll create a custom seed script!


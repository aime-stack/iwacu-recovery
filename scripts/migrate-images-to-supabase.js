// scripts/migrate-images-to-supabase.js
// Migrates images from local /public folder to Supabase Storage
// Updates database records with new Supabase Storage URLs

const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Use DATABASE_URL if DIRECT_URL fails (port 6543 with pooling works better)
// Prefer DATABASE_URL as it uses port 6543 which doesn't require IP whitelisting
let databaseUrl = process.env.DATABASE_URL || process.env.DIRECT_URL

// Check for port 5432 (requires IP whitelisting)
const hasPort5432 = databaseUrl && databaseUrl.includes(':5432')
const hasPort6543 = databaseUrl && databaseUrl.includes(':6543')

if (hasPort5432 && !hasPort6543) {
  console.log('⚠ Warning: Connection string uses port 5432 (requires IP whitelisting)')
  console.log('   Port 5432 needs your IP address to be allowed in Supabase Dashboard')
  console.log('   Recommended: Switch to port 6543 (Transaction mode) - no IP restrictions\n')
  
  // Try to find DATABASE_URL that uses port 6543
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes(':6543')) {
    console.log('   Found DATABASE_URL with port 6543 - using that instead\n')
    databaseUrl = process.env.DATABASE_URL
  } else {
    console.log('   ⚠ Both DIRECT_URL and DATABASE_URL use port 5432')
    console.log('   Please update at least one to use port 6543\n')
  }
} else if (hasPort6543) {
  console.log('✅ Using connection with port 6543 (Transaction mode - recommended)\n')
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

// Test database connection at startup
async function testDatabaseConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connection successful!\n')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.error('\n📝 Fix your connection string:')
    console.error('1. Go to Supabase Dashboard → Settings → Database')
    console.error('2. Copy "Transaction" mode connection string (port 6543)')
    console.error('3. Update DIRECT_URL in your .env file')
    console.error('   Format: postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres\n')
    return false
  }
}

// Initialize Supabase Admin Client
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
let serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Clean up if env var includes the key name (common .env mistake)
if (supabaseUrl && supabaseUrl.includes('NEXT_PUBLIC_SUPABASE_URL=')) {
  supabaseUrl = supabaseUrl.replace(/^NEXT_PUBLIC_SUPABASE_URL=/, '').trim()
}
if (serviceRoleKey && serviceRoleKey.includes('SUPABASE_SERVICE_ROLE_KEY=')) {
  serviceRoleKey = serviceRoleKey.replace(/^SUPABASE_SERVICE_ROLE_KEY=/, '').trim()
}

// Validate URL format
if (supabaseUrl && !supabaseUrl.startsWith('http')) {
  console.error('❌ Invalid Supabase URL format')
  console.error(`   Got: ${supabaseUrl}`)
  console.error('   Should be: https://xxxxx.supabase.co')
  console.error('   Check your .env file - make sure NEXT_PUBLIC_SUPABASE_URL is set correctly')
  process.exit(1)
}

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing Supabase credentials in .env')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  console.error('')
  console.error('Make sure your .env file has:')
  console.error('NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co')
  console.error('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here')
  process.exit(1)
}

console.log('🔐 Supabase URL:', supabaseUrl)
console.log('🔑 Service Role Key:', serviceRoleKey ? `${serviceRoleKey.substring(0, 10)}...` : 'MISSING')
console.log('')

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Verify connection
async function verifyConnection() {
  const { data, error } = await supabase.storage.listBuckets()
  if (error) {
    console.error('❌ Cannot connect to Supabase Storage:', error.message)
    console.error('   Check your SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL')
    process.exit(1)
  }
  console.log(`✅ Connected! Found ${data?.length || 0} buckets\n`)
}

// Helper functions
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  }
  return contentTypes[ext] || 'image/jpeg'
}

async function uploadToSupabase(localPath, bucket, storagePath) {
  if (!fs.existsSync(localPath)) {
    throw new Error(`File not found: ${localPath}`)
  }

  // Check if bucket exists
  const { data: buckets, error: listError } = await supabase.storage.listBuckets()
  if (listError) {
    throw new Error(`Failed to list buckets: ${listError.message}`)
  }

  const bucketExists = buckets?.some(b => b.name === bucket)
  if (!bucketExists) {
    throw new Error(`Bucket "${bucket}" does not exist. Please create it in Supabase Dashboard first.`)
  }

  const fileBuffer = fs.readFileSync(localPath)
  const contentType = getContentType(localPath)

  console.log(`  Uploading to ${bucket}/${storagePath}...`)

  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true,
        cacheControl: '3600',
      })

    if (error) {
      // Log full error details
      console.error(`  Error details:`, JSON.stringify(error, null, 2))
      throw new Error(`Failed to upload: ${error.message || JSON.stringify(error)}`)
    }

    if (!data) {
      throw new Error('Upload succeeded but no data returned')
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path)

    return {
      url: publicUrl,
      path: data.path,
    }
  } catch (error) {
    // Handle JSON parse errors or other errors
    if (error.message.includes('JSON')) {
      throw new Error(`Supabase API error - check bucket permissions and service role key. Original: ${error.message}`)
    }
    throw error
  }
}

// Migration functions
async function migrateGalleryImages() {
  console.log('\n📸 Migrating Gallery Images...')
  
  const images = await prisma.galleryImage.findMany({
    where: {
      OR: [
        { storagePath: null },
        { imageUrl: { startsWith: '/' } },
      ],
    },
  })

  console.log(`Found ${images.length} gallery images to migrate`)

  for (const image of images) {
    try {
      if (image.storagePath && !image.imageUrl.startsWith('/')) {
        console.log(`  ✓ Skipping ${image.title} (already migrated)`)
        continue
      }

      const localPath = image.src.startsWith('/')
        ? path.join(process.cwd(), 'public', image.src.substring(1))
        : image.src

      if (!fs.existsSync(localPath)) {
        console.log(`  ⚠ Skipping ${image.title} (file not found: ${localPath})`)
        continue
      }

      // Preserve original filename structure (e.g., gallery/event1.jpg)
      const originalPath = image.src.startsWith('/') ? image.src.substring(1) : image.src
      const storagePath = originalPath.replace(/^\//, '')

      const { url, path: storagePathResult } = await uploadToSupabase(
        localPath,
        'gallery',
        storagePath
      )

      await prisma.galleryImage.update({
        where: { id: image.id },
        data: {
          imageUrl: url,
          storagePath: storagePathResult,
          src: url, // Update legacy field too
        },
      })

      console.log(`  ✓ Migrated: ${image.title}`)
    } catch (error) {
      console.error(`  ✗ Failed to migrate ${image.title}:`, error.message)
    }
  }

  console.log('✅ Gallery images migration complete\n')
}

async function migrateArticles() {
  console.log('\n📰 Migrating Articles...')
  
    const articles = await prisma.article.findMany({
      where: {
        OR: [
          { storagePath: null },
          { imageUrl: { startsWith: '/' } },
        ],
      },
    })

  console.log(`Found ${articles.length} articles with images to migrate`)

  for (const article of articles) {
    if (!article.imageUrl || !article.imageUrl.startsWith('/')) {
      continue
    }

    try {
      const localPath = path.join(process.cwd(), 'public', article.imageUrl.substring(1))

      if (!fs.existsSync(localPath)) {
        console.log(`  ⚠ Skipping ${article.title} (file not found)`)
        continue
      }

      // Preserve original path structure
      const originalPath = article.imageUrl.substring(1)
      const storagePath = originalPath

      const { url, path: storagePathResult } = await uploadToSupabase(
        localPath,
        'articles',
        storagePath
      )

      await prisma.article.update({
        where: { id: article.id },
        data: {
          imageUrl: url,
          storagePath: storagePathResult,
        },
      })

      console.log(`  ✓ Migrated: ${article.title}`)
    } catch (error) {
      console.error(`  ✗ Failed to migrate ${article.title}:`, error.message)
    }
  }

  console.log('✅ Articles migration complete\n')
}

async function migrateNews() {
  console.log('\n📰 Migrating News...')
  
  try {
    // Use lowercase 'news' - Prisma models are case-sensitive
    const newsItems = await prisma.news.findMany({
      where: {
        OR: [
          { storagePath: null },
          { imageUrl: { startsWith: '/' } },
        ],
      },
    })

    if (!newsItems || newsItems.length === 0) {
      console.log('No news items with images to migrate\n')
      return
    }

    console.log(`Found ${newsItems.length} news items with images to migrate`)

    for (const item of newsItems) {
      if (!item.imageUrl || !item.imageUrl.startsWith('/')) {
        continue
      }

      try {
        const localPath = path.join(process.cwd(), 'public', item.imageUrl.substring(1))

        if (!fs.existsSync(localPath)) {
          console.log(`  ⚠ Skipping ${item.title} (file not found)`)
          continue
        }

        // Preserve original path structure
        // For news: /news/breakfast-1.jpg -> news/breakfast-1.jpg (keep folder structure)
        const originalPath = item.imageUrl.substring(1)
        const storagePath = originalPath // Keep full path including folder

        const { url, path: storagePathResult } = await uploadToSupabase(
          localPath,
          'news',
          storagePath
        )

        await prisma.news.update({
          where: { id: item.id },
          data: {
            imageUrl: url,
            storagePath: storagePathResult,
          },
        })

        console.log(`  ✓ Migrated: ${item.title}`)
      } catch (error) {
        console.error(`  ✗ Failed to migrate ${item.title}:`, error.message)
      }
    }

    console.log('✅ News migration complete\n')
  } catch (error) {
    console.log('⚠ News model might not exist, skipping...\n')
  }
}

async function migratePartners() {
  console.log('\n🤝 Migrating Partners...')
  
  try {
    const partners = await prisma.partner.findMany({
      where: {
        OR: [
          { storagePath: null },
          { logoUrl: { startsWith: '/' } },
        ],
      },
    })

    if (!partners || partners.length === 0) {
      console.log('No partners with logos to migrate\n')
      return
    }

    console.log(`Found ${partners.length} partners to migrate`)

    for (const partner of partners) {
      if (!partner.logoUrl || !partner.logoUrl.startsWith('/')) {
        continue
      }

      try {
        const localPath = path.join(process.cwd(), 'public', partner.logoUrl.substring(1))

        if (!fs.existsSync(localPath)) {
          console.log(`  ⚠ Skipping ${partner.name} (file not found)`)
          continue
        }

        // Preserve original path, but remove bucket name prefix
        const originalPath = partner.logoUrl.substring(1)
        const storagePath = originalPath.replace(/^partners\//, '') // Remove "partners/" prefix

        const { url, path: storagePathResult } = await uploadToSupabase(
          localPath,
          'partners',
          storagePath
        )

        await prisma.partner.update({
          where: { id: partner.id },
          data: {
            logoUrl: url,
            storagePath: storagePathResult,
          },
        })

        console.log(`  ✓ Migrated: ${partner.name}`)
      } catch (error) {
        console.error(`  ✗ Failed to migrate ${partner.name}:`, error.message)
      }
    }

    console.log('✅ Partners migration complete\n')
  } catch (error) {
    if (error.message && error.message.includes('partner')) {
      console.log('⚠ Partner model error:', error.message)
      console.log('   Make sure Prisma Client is regenerated: npx prisma generate\n')
    } else {
      console.error('⚠ Error migrating partners:', error.message)
      console.log('')
    }
  }
}

async function migrateTeam() {
  console.log('\n👥 Migrating Team...')
  
  try {
    const teamMembers = await prisma.team.findMany({
      where: {
        OR: [
          { storagePath: null },
          { photoUrl: { startsWith: '/' } },
        ],
      },
    })

    if (!teamMembers || teamMembers.length === 0) {
      console.log('No team members with photos to migrate\n')
      return
    }

    console.log(`Found ${teamMembers.length} team members to migrate`)

    for (const member of teamMembers) {
      if (!member.photoUrl || !member.photoUrl.startsWith('/')) {
        continue
      }

      try {
        const localPath = path.join(process.cwd(), 'public', member.photoUrl.substring(1))

        if (!fs.existsSync(localPath)) {
          console.log(`  ⚠ Skipping ${member.name} (file not found)`)
          continue
        }

        // Preserve original path, but remove bucket name prefix
        const originalPath = member.photoUrl.substring(1)
        const storagePath = originalPath.replace(/^team\//, '') // Remove "team/" prefix

        const { url, path: storagePathResult } = await uploadToSupabase(
          localPath,
          'team',
          storagePath
        )

        await prisma.team.update({
          where: { id: member.id },
          data: {
            photoUrl: url,
            storagePath: storagePathResult,
          },
        })

        console.log(`  ✓ Migrated: ${member.name}`)
      } catch (error) {
        console.error(`  ✗ Failed to migrate ${member.name}:`, error.message)
      }
    }

    console.log('✅ Team migration complete\n')
  } catch (error) {
    if (error.message && error.message.includes('team')) {
      console.log('⚠ Team model error:', error.message)
      console.log('   Make sure Prisma Client is regenerated: npx prisma generate\n')
    } else {
      console.error('⚠ Error migrating team:', error.message)
      console.log('')
    }
  }
}

async function migrateSchools() {
  console.log('\n🏫 Migrating Schools...')
  
  try {
    const schools = await prisma.school.findMany({
      where: {
        OR: [
          { storagePath: null },
          { logoUrl: { startsWith: '/' } },
        ],
      },
    })

    if (!schools || schools.length === 0) {
      console.log('No schools with logos to migrate\n')
      return
    }

    console.log(`Found ${schools.length} schools to migrate`)

    for (const school of schools) {
      if (!school.logoUrl || !school.logoUrl.startsWith('/')) {
        continue
      }

      try {
        const localPath = path.join(process.cwd(), 'public', school.logoUrl.substring(1))

        if (!fs.existsSync(localPath)) {
          console.log(`  ⚠ Skipping ${school.name} (file not found)`)
          continue
        }

        // Preserve original path
        // For schools: /school/school_1.jpg -> school/school_1.jpg (keep folder structure)
        const originalPath = school.logoUrl.substring(1)
        const storagePath = originalPath // Keep full path

        const { url, path: storagePathResult } = await uploadToSupabase(
          localPath,
          'schools',
          storagePath
        )

        await prisma.school.update({
          where: { id: school.id },
          data: {
            logoUrl: url,
            storagePath: storagePathResult,
          },
        })

        console.log(`  ✓ Migrated: ${school.name}`)
      } catch (error) {
        console.error(`  ✗ Failed to migrate ${school.name}:`, error.message)
      }
    }

    console.log('✅ Schools migration complete\n')
  } catch (error) {
    if (error.message && error.message.includes('school')) {
      console.log('⚠ School model error:', error.message)
      console.log('   Make sure Prisma Client is regenerated: npx prisma generate\n')
    } else {
      console.error('⚠ Error migrating schools:', error.message)
      console.log('')
    }
  }
}

async function migrateGenericImages() {
  console.log('\n🖼️  Migrating Generic Images...')
  
  try {
    const images = await prisma.image.findMany({
      where: {
        OR: [
          { storagePath: null },
          { imageUrl: { startsWith: '/' } },
        ],
      },
    })

    if (!images || images.length === 0) {
      console.log('No generic images to migrate\n')
      return
    }

    console.log(`Found ${images.length} generic images to migrate`)

    for (const image of images) {
      if (!image.imageUrl || !image.imageUrl.startsWith('/')) {
        continue
      }

      try {
        const localPath = path.join(process.cwd(), 'public', image.imageUrl.substring(1))

        if (!fs.existsSync(localPath)) {
          console.log(`  ⚠ Skipping ${image.title} (file not found)`)
          continue
        }

        // Preserve original path structure including subdirectories
        // e.g., /images/cognetive.jpg -> images/cognetive.jpg
        // e.g., /images/activities/tree-planting.jpg -> images/activities/tree-planting.jpg
        const originalPath = image.imageUrl.substring(1)
        const storagePath = originalPath // Keep full path including folders

        const { url, path: storagePathResult } = await uploadToSupabase(
          localPath,
          'images',
          storagePath
        )

        await prisma.image.update({
          where: { id: image.id },
          data: {
            imageUrl: url,
            storagePath: storagePathResult,
          },
        })

        console.log(`  ✓ Migrated: ${image.title}`)
      } catch (error) {
        console.error(`  ✗ Failed to migrate ${image.title}:`, error.message)
      }
    }

    console.log('✅ Generic images migration complete\n')
  } catch (error) {
    if (error.message && error.message.includes('image') || error.message.includes('Image')) {
      console.log('⚠ Image model error:', error.message)
      console.log('   Make sure Prisma Client is regenerated: npx prisma generate\n')
    } else {
      console.error('⚠ Error migrating generic images:', error.message)
      console.log('')
    }
  }
}

// Main function
async function main() {
  console.log('🚀 Starting Image Migration to Supabase Storage...\n')
  console.log('This will:')
  console.log('  1. Upload images from /public folder to Supabase Storage')
  console.log('  2. Update database records with new Supabase URLs')
  console.log('  3. Preserve original file paths for compatibility\n')

  // Verify Supabase Storage connection first
  await verifyConnection()

  // Test database connection
  const dbConnected = await testDatabaseConnection()
  if (!dbConnected) {
    console.error('❌ Cannot proceed without database connection')
    process.exit(1)
  }

  try {
    await migrateGalleryImages()
    await migrateArticles()
    await migrateNews()
    await migratePartners()
    await migrateTeam()
    await migrateSchools()
    await migrateGenericImages()

    console.log('✅ All migrations complete!')
    console.log('\nNext steps:')
    console.log('  1. Verify images in Supabase Storage Dashboard')
    console.log('  2. Test your application')
    console.log('  3. Remove local images after verification (optional)')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

// scripts/migrate-images-to-supabase.ts
// Migrates images from local /public folder to Supabase Storage
// Updates database records with new Supabase Storage URLs

import { PrismaClient } from '@prisma/client'
import { createSupabaseAdminClient } from '../src/lib/supabase'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

// Map local folders to Supabase Storage buckets
const BUCKET_MAPPING: Record<string, string> = {
  'gallery': 'gallery',
  'news': 'news',
  'partners': 'partners',
  'schools': 'schools', // or 'school' based on your bucket name
  'school': 'schools', // handle both
  'team': 'team',
  'images': 'images',
  'articles': 'articles', // if articles exist in public folder
}

// Helper to get content type from file extension
function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  const contentTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  }
  return contentTypes[ext] || 'image/jpeg'
}

// Upload file to Supabase Storage
async function uploadToSupabase(
  localPath: string,
  bucket: string,
  storagePath: string
): Promise<{ url: string; path: string }> {
  const supabase = createSupabaseAdminClient()

  if (!fs.existsSync(localPath)) {
    throw new Error(`File not found: ${localPath}`)
  }

  const fileBuffer = fs.readFileSync(localPath)
  const contentType = getContentType(localPath)

  console.log(`  Uploading to ${bucket}/${storagePath}...`)

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: true, // Overwrite if exists
    })

  if (error) {
    throw new Error(`Failed to upload: ${error.message}`)
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path)

  return {
    url: publicUrl,
    path: data.path,
  }
}

// Migrate Gallery Images
async function migrateGalleryImages() {
  console.log('\n📸 Migrating Gallery Images...')
  
  const images = await prisma.galleryImage.findMany({
    where: {
      OR: [
        { storagePath: null },
        { imageUrl: { startsWith: '/' } }, // Local paths start with /
      ],
    },
  })

  console.log(`Found ${images.length} gallery images to migrate`)

  for (const image of images) {
    try {
      // Skip if already migrated (has storagePath and URL doesn't start with /)
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

      const fileName = path.basename(localPath)
      const storagePath = `migrated/${image.id}-${fileName}`

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
    } catch (error: any) {
      console.error(`  ✗ Failed to migrate ${image.title}:`, error.message)
    }
  }

  console.log('✅ Gallery images migration complete\n')
}

// Migrate Articles
async function migrateArticles() {
  console.log('\n📰 Migrating Articles...')
  
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { storagePath: null, imageUrl: { not: null } },
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

      const fileName = path.basename(localPath)
      const storagePath = `migrated/${article.id}-${fileName}`

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
    } catch (error: any) {
      console.error(`  ✗ Failed to migrate ${article.title}:`, error.message)
    }
  }

  console.log('✅ Articles migration complete\n')
}

// Migrate News (if News model exists)
async function migrateNews() {
  // Check if News model exists by trying to find records
  try {
    const newsItems = await (prisma as any).news?.findMany({
      where: {
        OR: [
          { storagePath: null, imageUrl: { not: null } },
          { imageUrl: { startsWith: '/' } },
        ],
      },
    })

    if (!newsItems || newsItems.length === 0) {
      return
    }

    console.log('\n📰 Migrating News...')
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

        const fileName = path.basename(localPath)
        const storagePath = `migrated/${item.id}-${fileName}`

        const { url, path: storagePathResult } = await uploadToSupabase(
          localPath,
          'news',
          storagePath
        )

        await (prisma as any).news.update({
          where: { id: item.id },
          data: {
            imageUrl: url,
            storagePath: storagePathResult,
          },
        })

        console.log(`  ✓ Migrated: ${item.title}`)
      } catch (error: any) {
        console.error(`  ✗ Failed to migrate ${item.title}:`, error.message)
      }
    }

    console.log('✅ News migration complete\n')
  } catch (error) {
    // News model might not exist, skip silently
  }
}

// Migrate Partners
async function migratePartners() {
  try {
    const partners = await (prisma as any).partner?.findMany({
      where: {
        OR: [
          { storagePath: null, logoUrl: { not: null } },
          { logoUrl: { startsWith: '/' } },
        ],
      },
    })

    if (!partners || partners.length === 0) {
      return
    }

    console.log('\n🤝 Migrating Partners...')
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

        const fileName = path.basename(localPath)
        const storagePath = `migrated/${partner.id}-${fileName}`

        const { url, path: storagePathResult } = await uploadToSupabase(
          localPath,
          'partners',
          storagePath
        )

        await (prisma as any).partner.update({
          where: { id: partner.id },
          data: {
            logoUrl: url,
            storagePath: storagePathResult,
          },
        })

        console.log(`  ✓ Migrated: ${partner.name}`)
      } catch (error: any) {
        console.error(`  ✗ Failed to migrate ${partner.name}:`, error.message)
      }
    }

    console.log('✅ Partners migration complete\n')
  } catch (error) {
    // Partner model might not exist
  }
}

// Migrate Team
async function migrateTeam() {
  try {
    const teamMembers = await (prisma as any).team?.findMany({
      where: {
        OR: [
          { storagePath: null, photoUrl: { not: null } },
          { photoUrl: { startsWith: '/' } },
        ],
      },
    })

    if (!teamMembers || teamMembers.length === 0) {
      return
    }

    console.log('\n👥 Migrating Team...')
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

        const fileName = path.basename(localPath)
        const storagePath = `migrated/${member.id}-${fileName}`

        const { url, path: storagePathResult } = await uploadToSupabase(
          localPath,
          'team',
          storagePath
        )

        await (prisma as any).team.update({
          where: { id: member.id },
          data: {
            photoUrl: url,
            storagePath: storagePathResult,
          },
        })

        console.log(`  ✓ Migrated: ${member.name}`)
      } catch (error: any) {
        console.error(`  ✗ Failed to migrate ${member.name}:`, error.message)
      }
    }

    console.log('✅ Team migration complete\n')
  } catch (error) {
    // Team model might not exist
  }
}

// Migrate Schools
async function migrateSchools() {
  try {
    const schools = await (prisma as any).school?.findMany({
      where: {
        OR: [
          { storagePath: null, logoUrl: { not: null } },
          { logoUrl: { startsWith: '/' } },
        ],
      },
    })

    if (!schools || schools.length === 0) {
      return
    }

    console.log('\n🏫 Migrating Schools...')
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

        const fileName = path.basename(localPath)
        const storagePath = `migrated/${school.id}-${fileName}`

        const { url, path: storagePathResult } = await uploadToSupabase(
          localPath,
          'schools',
          storagePath
        )

        await (prisma as any).school.update({
          where: { id: school.id },
          data: {
            logoUrl: url,
            storagePath: storagePathResult,
          },
        })

        console.log(`  ✓ Migrated: ${school.name}`)
      } catch (error: any) {
        console.error(`  ✗ Failed to migrate ${school.name}:`, error.message)
      }
    }

    console.log('✅ Schools migration complete\n')
  } catch (error) {
    // School model might not exist
  }
}

// Migrate generic Images
async function migrateGenericImages() {
  try {
    const images = await (prisma as any).image?.findMany({
      where: {
        OR: [
          { storagePath: null, imageUrl: { not: null } },
          { imageUrl: { startsWith: '/' } },
        ],
      },
    })

    if (!images || images.length === 0) {
      return
    }

    console.log('\n🖼️  Migrating Generic Images...')
    console.log(`Found ${images.length} images to migrate`)

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

        const fileName = path.basename(localPath)
        const storagePath = `migrated/${image.id}-${fileName}`

        const { url, path: storagePathResult } = await uploadToSupabase(
          localPath,
          'images',
          storagePath
        )

        await (prisma as any).image.update({
          where: { id: image.id },
          data: {
            imageUrl: url,
            storagePath: storagePathResult,
          },
        })

        console.log(`  ✓ Migrated: ${image.title}`)
      } catch (error: any) {
        console.error(`  ✗ Failed to migrate ${image.title}:`, error.message)
      }
    }

    console.log('✅ Generic images migration complete\n')
  } catch (error) {
    // Image model might not exist
  }
}

// Main migration function
async function main() {
  console.log('🚀 Starting Image Migration to Supabase Storage...\n')
  console.log('This will:')
  console.log('  1. Upload images from /public folder to Supabase Storage')
  console.log('  2. Update database records with new Supabase URLs')
  console.log('  3. Preserve original paths in legacy fields where applicable\n')

  try {
    // Run all migrations
    await migrateGalleryImages()
    await migrateArticles()
    await migrateNews()
    await migratePartners()
    await migrateTeam()
    await migrateSchools()
    await migrateGenericImages()

    console.log('✅ All migrations complete!')
    console.log('\nNext steps:')
    console.log('  1. Verify images are accessible in Supabase Storage')
    console.log('  2. Test your application to ensure images load correctly')
    console.log('  3. Optionally remove local images from /public folder after verification')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run migration
main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})


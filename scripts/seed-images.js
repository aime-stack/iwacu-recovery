// scripts/seed-images.js
// Seeds generic images from /public/images/ folder (including subdirectories)

const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// Recursively find all image files in a directory
function findImages(dir, baseDir = dir) {
  const files = []
  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/')

    if (item.isDirectory()) {
      // Recursively search subdirectories
      files.push(...findImages(fullPath, baseDir))
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase()
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
        files.push({
          path: fullPath,
          relativePath: '/' + relativePath, // Add leading slash
          name: item.name,
          title: path.parse(item.name).name.replace(/[-_]/g, ' '),
        })
      }
    }
  }

  return files
}

async function main() {
  console.log('🖼️  Seeding Generic Images from /public/images...\n')

  const imagesDir = path.join(process.cwd(), 'public', 'images')
  
  if (!fs.existsSync(imagesDir)) {
    console.log('⚠ /public/images directory not found')
    return
  }

  const imageFiles = findImages(imagesDir)

  console.log(`Found ${imageFiles.length} image files\n`)

  let seeded = 0
  let skipped = 0

  for (const imgFile of imageFiles) {
    try {
      // Determine category from path
      let category = 'general'
      if (imgFile.relativePath.includes('/activities/')) {
        category = 'activities'
      } else if (imgFile.relativePath.includes('/cognetive') || imgFile.relativePath.includes('congnative')) {
        category = 'cognitive'
      }

      // Extract title from filename
      const title = imgFile.title

      await prisma.image.create({
        data: {
          title: title,
          alt: title,
          imageUrl: imgFile.relativePath, // Will be updated by migration
          storagePath: null,
          category: category,
        },
      })

      console.log(`✓ Seeded: ${title} (${imgFile.relativePath})`)
      seeded++
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⚠ Skipped: ${imgFile.name} (already exists)`)
        skipped++
      } else {
        console.error(`✗ Failed: ${imgFile.name}`, error.message)
      }
    }
  }

  console.log(`\n✅ Complete!`)
  console.log(`   Seeded: ${seeded}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`\nNext step: Run image migration:`)
  console.log(`   npm run migrate:images`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


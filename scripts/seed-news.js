// scripts/seed-news.js
// Seeds news images from /public/news/ folder

const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
  console.log('📰 Seeding News Images from /public/news...\n')

  const newsDir = path.join(process.cwd(), 'public', 'news')
  
  if (!fs.existsSync(newsDir)) {
    console.log('⚠ /public/news directory not found')
    return
  }

  const files = fs.readdirSync(newsDir)
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)
  })

  console.log(`Found ${imageFiles.length} news images\n`)

  let seeded = 0
  let skipped = 0

  for (const file of imageFiles) {
    try {
      const fileName = path.parse(file).name
      // Extract title from filename (e.g., "breakfast-1" -> "Breakfast 1")
      const title = fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      
      // Generate slug from filename
      const slug = fileName.toLowerCase().replace(/[-_]/g, '-')

      const imageUrl = `/news/${file}`

      await prisma.news.create({
        data: {
          title: title,
          slug: slug,
          category: 'News',
          excerpt: `News image: ${title}`,
          content: `<p>News image from ${file}</p>`,
          author: 'Iwacu Recovery Centre',
          published: true,
          publishedAt: new Date(),
          imageUrl: imageUrl, // Will be updated by migration
          storagePath: null,
        },
      })

      console.log(`✓ Seeded: ${title} (${file})`)
      seeded++
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⚠ Skipped: ${file} (already exists)`)
        skipped++
      } else {
        console.error(`✗ Failed: ${file}`, error.message)
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


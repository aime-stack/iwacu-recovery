// scripts/seed-schools.js
// Seeds schools from /public/school/ folder

const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
  console.log('🏫 Seeding Schools from /public/school...\n')

  const schoolDir = path.join(process.cwd(), 'public', 'school')
  
  if (!fs.existsSync(schoolDir)) {
    console.log('⚠ /public/school directory not found')
    return
  }

  const files = fs.readdirSync(schoolDir)
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)
  })

  console.log(`Found ${imageFiles.length} school images\n`)

  let seeded = 0
  let skipped = 0

  for (const file of imageFiles) {
    try {
      const fileName = path.parse(file).name
      // Extract school name from filename (e.g., "school_1" -> "School 1")
      const schoolName = fileName.replace(/[_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

      const logoUrl = `/school/${file}`

      await prisma.school.create({
        data: {
          name: schoolName,
          logoUrl: logoUrl, // Will be updated by migration
          storagePath: null,
          address: null,
          description: null,
        },
      })

      console.log(`✓ Seeded: ${schoolName} (${file})`)
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


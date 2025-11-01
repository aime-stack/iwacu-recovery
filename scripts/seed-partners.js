// scripts/seed-partners.js
// Seeds partners from /public/partners/ folder

const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// Partner data - extracted from filenames, update with actual details
const partners = [
  {
    name: 'Baho Family',
    website: null,
    logoUrl: '/partners/baho-family.png',
    description: null,
  },
  {
    name: 'Colgate',
    website: 'https://www.colgate.com',
    logoUrl: '/partners/colgate.png',
    description: null,
  },
  {
    name: 'Colgate Palmolive',
    website: 'https://www.colgatepalmolive.com',
    logoUrl: '/partners/Emblem-Colgate-Palmolive.jpg',
    description: null,
  },
  {
    name: 'Forensic',
    website: null,
    logoUrl: '/partners/forensic.png',
    description: null,
  },
  {
    name: 'Good People International',
    website: null,
    logoUrl: '/partners/good-people-international.png',
    description: null,
  },
  {
    name: 'Livewell',
    website: null,
    logoUrl: '/partners/livewell.png',
    description: null,
  },
  {
    name: 'MOH Rwanda',
    website: 'https://www.moh.gov.rw',
    logoUrl: '/partners/moh-rwanda.png',
    description: 'Ministry of Health Rwanda',
  },
  {
    name: 'NRS',
    website: null,
    logoUrl: '/partners/nrs.png',
    description: null,
  },
  {
    name: 'Pakistan Embassy',
    website: null,
    logoUrl: '/partners/pakistan-embassy.png',
    description: null,
  },
  {
    name: 'RBC',
    website: null,
    logoUrl: '/partners/rbc.png',
    description: null,
  },
  {
    name: 'SGC Foundation',
    website: null,
    logoUrl: '/partners/sgc-foundation.png',
    description: 'Susan Gitau Counseling Foundation',
  },
  {
    name: 'Shema',
    website: null,
    logoUrl: '/partners/shema.png',
    description: null,
  },
  {
    name: 'Ubuntu Wellness',
    website: null,
    logoUrl: '/partners/ubuntu-wellness.png',
    description: null,
  },
]

async function main() {
  console.log('🤝 Seeding Partners...\n')

  let seeded = 0
  let skipped = 0

  for (const partner of partners) {
    try {
      // Check if file exists
      const filePath = path.join(process.cwd(), 'public', partner.logoUrl.substring(1))
      if (!fs.existsSync(filePath)) {
        console.log(`⚠ Skipping ${partner.name} (file not found: ${partner.logoUrl})`)
        continue
      }

      await prisma.partner.create({
        data: {
          name: partner.name,
          website: partner.website,
          logoUrl: partner.logoUrl, // Will be updated by image migration
          storagePath: null,
          description: partner.description,
        },
      })

      console.log(`✓ Seeded: ${partner.name}`)
      seeded++
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⚠ Skipped: ${partner.name} (already exists)`)
        skipped++
      } else {
        console.error(`✗ Failed: ${partner.name}`, error.message)
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


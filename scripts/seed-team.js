// scripts/seed-team.js
// Seeds team members from /public/team/ folder

const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// Team member data - update with actual names, roles, and bios
const teamMembers = [
  {
    name: 'Ange',
    role: 'Team Member',
    bio: null,
    photoUrl: '/team/ange.jpg',
  },
  {
    name: 'Byiringiro',
    role: 'Team Member',
    bio: null,
    photoUrl: '/team/byiringiro.jpg',
  },
  {
    name: 'Jean Claude',
    role: 'Director',
    bio: null,
    photoUrl: '/team/jean-claude.jpg',
  },
  {
    name: 'Marie Claire',
    role: 'Team Member',
    bio: null,
    photoUrl: '/team/marie-claire.jpg',
  },
  {
    name: 'Rukundo Blaise',
    role: 'Team Member',
    bio: null,
    photoUrl: '/team/rukundo-blaise.jpg',
  },
  {
    name: 'Sherrie',
    role: 'Team Member',
    bio: null,
    photoUrl: '/team/sherrie.png',
  },
  {
    name: 'Silouan Silala',
    role: 'Team Member',
    bio: null,
    photoUrl: '/team/silouan-silala.jpg',
  },
  {
    name: 'Susan Gitau',
    role: 'Team Member',
    bio: null,
    photoUrl: '/team/susan-gitau.jpg',
  },
  {
    name: 'Umulisa',
    role: 'Team Member',
    bio: null,
    photoUrl: '/team/umulisa.jpg',
  },
]

async function main() {
  console.log('👥 Seeding Team Members...\n')

  let seeded = 0
  let skipped = 0

  for (const member of teamMembers) {
    try {
      // Check if file exists
      const filePath = path.join(process.cwd(), 'public', member.photoUrl.substring(1))
      if (!fs.existsSync(filePath)) {
        console.log(`⚠ Skipping ${member.name} (file not found: ${member.photoUrl})`)
        continue
      }

      await prisma.team.create({
        data: {
          name: member.name,
          role: member.role,
          bio: member.bio,
          photoUrl: member.photoUrl, // Will be updated by image migration
          storagePath: null,
        },
      })

      console.log(`✓ Seeded: ${member.name} - ${member.role}`)
      seeded++
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⚠ Skipped: ${member.name} (already exists)`)
        skipped++
      } else {
        console.error(`✗ Failed: ${member.name}`, error.message)
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


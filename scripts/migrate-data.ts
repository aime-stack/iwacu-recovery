// scripts/migrate-data.ts
// Migrates data from old PostgreSQL database to Supabase
// Run this after schema migration but before image migration

import { PrismaClient as OldPrismaClient } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

// Initialize old database connection (update with your old DB credentials)
const oldPrisma = new OldPrismaClient({
  datasources: {
    db: {
      url: process.env.OLD_DATABASE_URL, // Add this to .env
    },
  },
})

// Initialize Supabase database connection
const newPrisma = new PrismaClient()

async function migrateGalleryImages() {
  console.log('\n📸 Migrating Gallery Images data...')
  
  try {
    const oldImages = await oldPrisma.galleryImage.findMany()
    console.log(`Found ${oldImages.length} gallery images to migrate`)

    for (const image of oldImages) {
      try {
        await newPrisma.galleryImage.create({
          data: {
            src: image.src,
            imageUrl: image.src, // Temporary: will be updated by image migration script
            alt: image.alt,
            title: image.title,
            description: image.description,
            category: image.category,
            displayOrder: image.displayOrder || 0,
            createdAt: image.createdAt,
          },
        })
        console.log(`  ✓ Migrated: ${image.title}`)
      } catch (error: any) {
        if (error.code === 'P2002') {
          console.log(`  ⚠ Skipping ${image.title} (already exists)`)
        } else {
          console.error(`  ✗ Failed to migrate ${image.title}:`, error.message)
        }
      }
    }

    console.log('✅ Gallery images data migration complete\n')
  } catch (error: any) {
    console.error('Error:', error.message)
    // Old database might not exist or connection failed
    console.log('⚠ Skipping gallery images (old database not accessible)')
  }
}

async function migrateArticles() {
  console.log('\n📰 Migrating Articles data...')
  
  try {
    const oldArticles = await oldPrisma.article.findMany()
    console.log(`Found ${oldArticles.length} articles to migrate`)

    for (const article of oldArticles) {
      try {
        await newPrisma.article.create({
          data: {
            title: article.title,
            slug: article.slug,
            category: article.category,
            excerpt: article.excerpt,
            content: article.content,
            imageUrl: null, // Will be set if article has image
            author: article.author,
            published: article.published,
            publishedAt: article.publishedAt,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
          },
        })
        console.log(`  ✓ Migrated: ${article.title}`)
      } catch (error: any) {
        if (error.code === 'P2002') {
          console.log(`  ⚠ Skipping ${article.title} (already exists)`)
        } else {
          console.error(`  ✗ Failed to migrate ${article.title}:`, error.message)
        }
      }
    }

    console.log('✅ Articles data migration complete\n')
  } catch (error: any) {
    console.error('Error:', error.message)
    console.log('⚠ Skipping articles (old database not accessible)')
  }
}

async function migrateAppointments() {
  console.log('\n📅 Migrating Appointments...')
  
  try {
    const oldAppointments = await oldPrisma.appointment.findMany()
    console.log(`Found ${oldAppointments.length} appointments to migrate`)

    for (const appointment of oldAppointments) {
      try {
        await newPrisma.appointment.create({
          data: {
            name: appointment.name,
            email: appointment.email,
            phone: appointment.phone,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            reason: appointment.reason,
            status: appointment.status,
            notes: appointment.notes,
            createdAt: appointment.createdAt,
            updatedAt: appointment.updatedAt,
          },
        })
        console.log(`  ✓ Migrated appointment for: ${appointment.name}`)
      } catch (error: any) {
        console.error(`  ✗ Failed to migrate appointment:`, error.message)
      }
    }

    console.log('✅ Appointments migration complete\n')
  } catch (error: any) {
    console.log('⚠ Skipping appointments (old database not accessible)')
  }
}

async function migrateContactMessages() {
  console.log('\n💬 Migrating Contact Messages...')
  
  try {
    const oldMessages = await oldPrisma.contactMessage.findMany()
    console.log(`Found ${oldMessages.length} messages to migrate`)

    for (const message of oldMessages) {
      try {
        await newPrisma.contactMessage.create({
          data: {
            name: message.name,
            email: message.email,
            phone: message.phone,
            subject: message.subject,
            message: message.message,
            service: message.service,
            read: false, // Default to unread
            createdAt: message.createdAt,
          },
        })
        console.log(`  ✓ Migrated message from: ${message.name}`)
      } catch (error: any) {
        console.error(`  ✗ Failed to migrate message:`, error.message)
      }
    }

    console.log('✅ Contact messages migration complete\n')
  } catch (error: any) {
    console.log('⚠ Skipping messages (old database not accessible)')
  }
}

async function migrateDonations() {
  console.log('\n💰 Migrating Donations...')
  
  try {
    const oldDonations = await oldPrisma.donation.findMany()
    console.log(`Found ${oldDonations.length} donations to migrate`)

    for (const donation of oldDonations) {
      try {
        await newPrisma.donation.create({
          data: {
            name: donation.name,
            email: donation.email,
            amount: donation.amount,
            transactionId: donation.transactionId,
            status: donation.status,
            isRecurring: donation.isRecurring,
            frequency: donation.frequency,
            sponsorName: donation.sponsorName,
            createdAt: donation.createdAt,
          },
        })
        console.log(`  ✓ Migrated donation: ${donation.transactionId}`)
      } catch (error: any) {
        if (error.code === 'P2002') {
          console.log(`  ⚠ Skipping donation ${donation.transactionId} (already exists)`)
        } else {
          console.error(`  ✗ Failed to migrate donation:`, error.message)
        }
      }
    }

    console.log('✅ Donations migration complete\n')
  } catch (error: any) {
    console.log('⚠ Skipping donations (old database not accessible)')
  }
}

async function main() {
  console.log('🚀 Starting Database Data Migration...\n')
  console.log('This will migrate data from your old database to Supabase\n')

  // Check if OLD_DATABASE_URL is set
  if (!process.env.OLD_DATABASE_URL) {
    console.log('⚠ OLD_DATABASE_URL not found in .env')
    console.log('\nIf you want to migrate from old database:')
    console.log('1. Add OLD_DATABASE_URL to your .env file')
    console.log('2. Format: OLD_DATABASE_URL=postgresql://user:password@host:port/database')
    console.log('\nAlternatively, you can manually import data using:')
    console.log('- Supabase Dashboard SQL Editor')
    console.log('- pg_dump/pg_restore commands')
    console.log('- Or use seed scripts if you have JSON data\n')
    
    await oldPrisma.$disconnect()
    await newPrisma.$disconnect()
    return
  }

  try {
    await migrateGalleryImages()
    await migrateArticles()
    await migrateAppointments()
    await migrateContactMessages()
    await migrateDonations()

    console.log('✅ All data migrations complete!')
    console.log('\nNext step: Run image migration:')
    console.log('  npm run migrate:images\n')
  } catch (error) {
    console.error('❌ Migration failed:', error)
  } finally {
    await oldPrisma.$disconnect()
    await newPrisma.$disconnect()
  }
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})


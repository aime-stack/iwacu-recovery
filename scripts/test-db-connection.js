// Quick script to test database connection
// Usage: node scripts/test-db-connection.js

// Load .env file manually (no need for dotenv package)
const fs = require('fs')
const path = require('path')

function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...values] = trimmed.split('=')
        const value = values.join('=').replace(/^["']|["']$/g, '') // Remove quotes
        if (key && value) {
          process.env[key.trim()] = value.trim()
        }
      }
    })
  }
}

loadEnvFile()

const { PrismaClient } = require('@prisma/client')

async function testConnection() {
  console.log('🔍 Testing Database Connection...\n')

  // Check environment variables
  const directUrl = process.env.DIRECT_URL
  const databaseUrl = process.env.DATABASE_URL

  console.log('Environment Variables:')
  if (directUrl) {
    const port = directUrl.match(/:(\d+)\//)?.[1] || 'unknown'
    const has5432 = directUrl.includes(':5432')
    const has6543 = directUrl.includes(':6543')
    console.log(`  DIRECT_URL: ${has5432 ? '⚠️  Port 5432' : has6543 ? '✅ Port 6543' : `Port ${port}`}`)
  } else {
    console.log('  DIRECT_URL: ❌ Not set')
  }

  if (databaseUrl) {
    const port = databaseUrl.match(/:(\d+)\//)?.[1] || 'unknown'
    const has5432 = databaseUrl.includes(':5432')
    const has6543 = databaseUrl.includes(':6543')
    console.log(`  DATABASE_URL: ${has5432 ? '⚠️  Port 5432' : has6543 ? '✅ Port 6543' : `Port ${port}`}`)
  } else {
    console.log('  DATABASE_URL: ❌ Not set')
  }

  console.log('')

  // Try to connect
  let prisma
  let connectionString

  // Try DATABASE_URL first (usually has port 6543)
  if (databaseUrl && databaseUrl.includes(':6543')) {
    console.log('Trying DATABASE_URL (port 6543)...')
    connectionString = databaseUrl
    prisma = new PrismaClient({
      datasources: {
        db: { url: databaseUrl },
      },
    })
  } else if (directUrl && directUrl.includes(':6543')) {
    console.log('Trying DIRECT_URL (port 6543)...')
    connectionString = directUrl
    prisma = new PrismaClient({
      datasources: {
        db: { url: directUrl },
      },
    })
  } else if (databaseUrl) {
    console.log('Trying DATABASE_URL...')
    connectionString = databaseUrl
    prisma = new PrismaClient({
      datasources: {
        db: { url: databaseUrl },
      },
    })
  } else if (directUrl) {
    console.log('Trying DIRECT_URL...')
    connectionString = directUrl
    prisma = new PrismaClient({
      datasources: {
        db: { url: directUrl },
      },
    })
  } else {
    console.error('❌ No connection string found in .env file')
    console.error('   Set either DIRECT_URL or DATABASE_URL')
    process.exit(1)
  }

  try {
    await prisma.$connect()
    console.log('✅ Connection successful!\n')
    
    // Test a simple query
    const count = await prisma.galleryImage.count()
    console.log(`📊 Database check: Found ${count} gallery images\n`)
    
    await prisma.$disconnect()
    console.log('✅ Database connection test passed!')
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    console.error('')
    
    if (connectionString.includes(':5432')) {
      console.error('🔧 Fix: Update to port 6543 (Transaction mode)')
      console.error('   1. Go to Supabase Dashboard → Settings → Database')
      console.error('   2. Copy "Transaction" mode connection string')
      console.error('   3. Update DIRECT_URL in .env file')
      console.error('   4. Format: ...pooler.supabase.com:6543/postgres\n')
    } else {
      console.error('🔧 Check:')
      console.error('   1. Verify your password in the connection string')
      console.error('   2. Check if your database is running')
      console.error('   3. Verify your project reference is correct\n')
    }
    
    await prisma.$disconnect().catch(() => {})
    process.exit(1)
  }
}

testConnection()


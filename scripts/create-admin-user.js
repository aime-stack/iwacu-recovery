// scripts/create-admin-user.js
// Creates an admin user in Supabase Auth and links it to StaffUser

const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load .env file manually
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...values] = trimmed.split('=')
        const value = values.join('=').replace(/^["']|["']$/g, '')
        if (key && value) {
          process.env[key.trim()] = value.trim()
        }
      }
    })
  }
}

loadEnvFile()

const prisma = new PrismaClient()

// Initialize Supabase Admin Client
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
let serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Clean up if env var includes the key name
if (supabaseUrl && supabaseUrl.includes('NEXT_PUBLIC_SUPABASE_URL=')) {
  supabaseUrl = supabaseUrl.replace(/^NEXT_PUBLIC_SUPABASE_URL=/, '').trim()
}
if (serviceRoleKey && serviceRoleKey.includes('SUPABASE_SERVICE_ROLE_KEY=')) {
  serviceRoleKey = serviceRoleKey.replace(/^SUPABASE_SERVICE_ROLE_KEY=/, '').trim()
}

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing Supabase credentials in .env')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createAdminUser(email, password, role = 'admin') {
  console.log(`🔐 Creating ${role} user in Supabase Auth...\n`)
  console.log(`Email: ${email}`)
  console.log(`Role: ${role}`)
  console.log(`Password: ${password ? '***' : '(using environment variable)'}\n`)

  try {
    // Check if user already exists in Supabase Auth
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()
    
    if (listError) {
      console.error('❌ Error checking existing users:', listError.message)
      return false
    }

    const existingUser = existingUsers?.users?.find(u => u.email === email)
    
    if (existingUser) {
      console.log('⚠️  User already exists in Supabase Auth')
      console.log(`   User ID: ${existingUser.id}`)
      
      // Check if linked to StaffUser
      const staffUser = await prisma.staffUser.findUnique({
        where: { email },
      })

      if (staffUser) {
        if (staffUser.supabaseId === existingUser.id) {
          console.log('✅ User is already linked to StaffUser')
          return true
        } else {
          console.log('📝 Updating StaffUser with Supabase ID...')
          await prisma.staffUser.update({
            where: { email },
            data: {
              supabaseId: existingUser.id,
              role: 'admin',
            },
          })
          console.log('✅ StaffUser updated!')
          return true
        }
      } else {
        // Create StaffUser record
        console.log('📝 Creating StaffUser record...')
        await prisma.staffUser.create({
          data: {
            email,
            supabaseId: existingUser.id,
            role: role,
          },
        })
        console.log('✅ StaffUser created!')
        return true
      }
    }

    // Create new user in Supabase Auth
    console.log('📝 Creating new user in Supabase Auth...')
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: password || process.env.ADMIN_PASSWORD || 'Iwacu2025!',
      email_confirm: true, // Auto-confirm for admin users
    })

    if (authError || !authData.user) {
      console.error('❌ Failed to create user in Supabase Auth:', authError?.message)
      return false
    }

    console.log(`✅ User created in Supabase Auth!`)
    console.log(`   User ID: ${authData.user.id}`)

    // Create or update StaffUser record
    console.log('📝 Creating/updating StaffUser record...')
    const staffUser = await prisma.staffUser.upsert({
      where: { email },
      update: {
        supabaseId: authData.user.id,
        role: role,
      },
      create: {
        email,
        supabaseId: authData.user.id,
        role: role,
      },
    })

    console.log(`✅ StaffUser record created/updated!`)
    console.log(`   StaffUser ID: ${staffUser.id}`)

    console.log('\n✅ Admin user setup complete!')
    console.log(`\nYou can now login with:`)
    console.log(`   Email: ${email}`)
    console.log(`   Password: ${password || process.env.ADMIN_PASSWORD || 'Iwacu2025!'}`)

    return true
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
    return false
  }
}

async function main() {
  const args = process.argv.slice(2)
  
  // If email and password provided, create single user
  if (args.length >= 2) {
    const email = args[0]
    const password = args[1]
    const role = args[2] || 'admin'
    
    console.log('🚀 User Setup Script\n')
    const success = await createAdminUser(email, password, role)
    
    if (!success) {
      console.error('\n❌ Failed to create user')
      process.exit(1)
    }
    return
  }

  // Otherwise, create default admin and staff users
  console.log('🚀 Setting up Admin and Staff Users\n')

  const adminSuccess = await createAdminUser('admin@iwacu.com', 'Iwacu2025!', 'admin')
  console.log('\n' + '='.repeat(50) + '\n')
  const staffSuccess = await createAdminUser('staff@iwacu.com', 'Iwacu2025!', 'staff')

  if (!adminSuccess || !staffSuccess) {
    console.error('\n❌ Failed to create some users')
    process.exit(1)
  }

  console.log('\n' + '='.repeat(50))
  console.log('✅ All users created successfully!')
  console.log('\nLogin credentials:')
  console.log('  Admin: admin@iwacu.com / Iwacu2025!')
  console.log('  Staff: staff@iwacu.com / Iwacu2025!')
}

main()
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


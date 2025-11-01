// src/lib/supabase-auth.ts
import { createSupabaseServerClient } from './supabase'
import { createSupabaseAdminClient } from './supabase'
import { prisma } from './prisma'
import { NextResponse } from 'next/server'

export type AuthUser = {
  id: string
  email: string
  role?: string
}

/**
 * Get the current authenticated user from Supabase session
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return null
    }

    // Optionally fetch role from StaffUser table
    const staffUser = await prisma.staffUser.findUnique({
      where: { supabaseId: user.id },
    })

    return {
      id: user.id,
      email: user.email!,
      role: staffUser?.role || 'admin',
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Verify if user is authenticated (for API routes)
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

/**
 * Verify if user is admin
 */
export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth()
  if (user.role !== 'admin') {
    throw new Error('Forbidden: Admin access required')
  }
  return user
}

/**
 * Create a Supabase Auth user and link to StaffUser
 */
export async function createStaffUser(
  email: string,
  password: string,
  role: string = 'admin'
): Promise<{ userId: string; staffUserId: number }> {
  const supabase = createSupabaseAdminClient()

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm for admin users
  })

  if (authError || !authData.user) {
    throw new Error(`Failed to create auth user: ${authError?.message}`)
  }

  // Create or update StaffUser record
  const staffUser = await prisma.staffUser.upsert({
    where: { email },
    update: {
      supabaseId: authData.user.id,
      role,
    },
    create: {
      email,
      supabaseId: authData.user.id,
      role,
    },
  })

  return {
    userId: authData.user.id,
    staffUserId: staffUser.id,
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return { session: data.session, user: data.user, error: null }
}

/**
 * Sign out current user
 */
export async function signOut() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
}

/**
 * Helper to create unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized') {
  return NextResponse.json({ error: message }, { status: 401 })
}

/**
 * Helper to create forbidden response
 */
export function forbiddenResponse(message: string = 'Forbidden') {
  return NextResponse.json({ error: message }, { status: 403 })
}
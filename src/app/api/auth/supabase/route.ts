// src/app/api/auth/supabase/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// POST - Sign in with Supabase Auth
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Create a mutable response object for cookie handling
    const cookieStore = await cookies() // Add await here
    const authCookies: Array<{ name: string; value: string; options: any }> = []

    // Create Supabase client with cookie handling for API routes
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
              // Store all cookies that Supabase sets (they all start with 'sb-')
              if (name.startsWith('sb-')) {
                authCookies.push({ name, value, options })
              }
            })
          },
        },
      }
    )

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.session) {
      return NextResponse.json(
        { success: false, error: error?.message || 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JSON response
    const response = NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    })

    // Set all auth cookies in the response with proper options
    authCookies.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, {
        ...options,
        httpOnly: options?.httpOnly ?? true,
        secure: options?.secure ?? process.env.NODE_ENV === 'production',
        sameSite: options?.sameSite ?? 'lax',
        path: options?.path ?? '/',
      })
    })

    // Also check for any remaining auth cookies that might have been set
    const allCookies = cookieStore.getAll()
    allCookies.forEach((cookie) => {
      if (cookie.name.startsWith('sb-')) {
        // Only set if not already in authCookies
        if (!authCookies.find(c => c.name === cookie.name)) {
          response.cookies.set(cookie.name, cookie.value, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
          })
        }
      }
    })

    return response
  } catch (error: any) {
    console.error('Sign in error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
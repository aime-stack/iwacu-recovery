// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies() // Add await here
    const response = NextResponse.json({ success: true })

    // Create Supabase client
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
            })
          },
        },
      }
    )

    // Sign out from Supabase
    await supabase.auth.signOut()

    // Clear all Supabase auth cookies
    const allCookies = cookieStore.getAll()
    allCookies.forEach((cookie) => {
      if (cookie.name.startsWith('sb-')) {
        response.cookies.delete(cookie.name)
      }
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ success: true }) // Always return success to clear client state
  }
}
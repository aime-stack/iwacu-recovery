// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Protect /admin routes except login page
  if (req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login') {
    // Get user from session
    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    // Protect /admin/donations - admin only
    if (req.nextUrl.pathname === '/admin/donations') {
      // Get user role from database
      const { prisma } = await import('@/lib/prisma')
      const staffUser = await prisma.staffUser.findUnique({
        where: { supabaseId: user.id },
        select: { role: true },
      })

      // If not admin, redirect to dashboard
      if (staffUser?.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}


import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    
    // Create Supabase client to check session
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {
            // Not needed for read-only check
          },
        },
      }
    );

    // Get current user
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    // Get user role from StaffUser table
    const { prisma } = await import('@/lib/prisma');
    const staffUser = await prisma.staffUser.findUnique({
      where: { supabaseId: user.id },
      select: { role: true },
    });

    return NextResponse.json({
      valid: true,
      email: user.email,
      id: user.id,
      role: staffUser?.role || 'staff', // Default to staff if not found
    });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}


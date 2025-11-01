// src/app/api/admin/stats/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, unauthorizedResponse } from '@/lib/supabase-auth'

export async function GET() {
  try {
    const user = await requireAuth()
    if (!user) {
      return unauthorizedResponse('Authentication required')
    }

    // Get user role to determine what stats to show
    const staffUser = await prisma.staffUser.findUnique({
      where: { supabaseId: user.id },
      select: { role: true },
    })

    const isAdmin = staffUser?.role === 'admin'

    // Fetch all stats in parallel
    const [
      appointments,
      galleryImages,
      articles,
      messages,
      teamMembers,
      donations,
      unreadMessages,
      pendingAppointments,
      publishedArticles,
    ] = await Promise.all([
      prisma.appointment.count(),
      prisma.galleryImage.count(),
      prisma.article.count(),
      prisma.contactMessage.count(),
      prisma.team.count(),
      isAdmin ? prisma.donation.count() : Promise.resolve(0),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.appointment.count({ where: { status: 'pending' } }),
      prisma.article.count({ where: { published: true } }),
    ])

    // Calculate recent activity (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const [
      recentAppointments,
      recentMessages,
      recentDonations,
    ] = await Promise.all([
      prisma.appointment.count({
        where: { createdAt: { gte: sevenDaysAgo } },
      }),
      prisma.contactMessage.count({
        where: { createdAt: { gte: sevenDaysAgo } },
      }),
      isAdmin
        ? prisma.donation.count({
            where: { createdAt: { gte: sevenDaysAgo } },
          })
        : Promise.resolve(0),
    ])

    // Calculate total donation amount (admin only)
    const totalDonations = isAdmin
      ? await prisma.donation.aggregate({
          _sum: { amount: true },
        })
      : { _sum: { amount: 0 } }

    return NextResponse.json({
      success: true,
      data: {
        appointments: {
          total: appointments,
          pending: pendingAppointments,
          recent: recentAppointments,
        },
        gallery: {
          total: galleryImages,
        },
        articles: {
          total: articles,
          published: publishedArticles,
        },
        messages: {
          total: messages,
          unread: unreadMessages,
          recent: recentMessages,
        },
        volunteers: {
          total: teamMembers,
        },
        donations: isAdmin
          ? {
              total: donations,
              recent: recentDonations,
              amount: totalDonations._sum.amount || 0,
            }
          : null,
      },
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}


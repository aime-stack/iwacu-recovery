// src/app/api/admin/messages/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, unauthorizedResponse } from '@/lib/supabase-auth'

// GET - List all contact messages (admin only)
export async function GET(request: Request) {
  try {
    await requireAdmin()
  } catch (error) {
    return unauthorizedResponse('Admin access required')
  }

  try {
    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get('unread') === 'true'

    const where: any = {}
    if (unreadOnly) {
      where.read = false
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// PATCH - Mark message as read (admin only)
export async function PATCH(request: Request) {
  try {
    await requireAdmin()
  } catch (error) {
    return unauthorizedResponse('Admin access required')
  }

  try {
    const body = await request.json()
    const { id, read } = body

    if (id === undefined || read === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: id, read' },
        { status: 400 }
      )
    }

    const message = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { read: read === true },
    })

    return NextResponse.json({ success: true, data: message })
  } catch (error: any) {
    console.error('Error updating message:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    )
  }
}


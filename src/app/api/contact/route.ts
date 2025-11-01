// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Submit contact message (public)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message, service } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, email, subject, message',
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        service: service || null,
        read: false,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Message received successfully',
      id: contactMessage.id,
    })
  } catch (error) {
    console.error('Error saving contact message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save message' },
      { status: 500 }
    )
  }
}


// src/app/api/appointments/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Create new appointment (public)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, appointmentDate, appointmentTime, reason } = body

    // Validate required fields
    if (!name || !email || !phone || !appointmentDate || !appointmentTime || !reason) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, email, phone, appointmentDate, appointmentTime, reason',
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

    // Validate appointment date is in the future
    const appointmentDateTime = new Date(appointmentDate)
    if (appointmentDateTime < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Appointment date must be in the future' },
        { status: 400 }
      )
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        appointmentDate: appointmentDateTime,
        appointmentTime,
        reason,
        status: 'pending',
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment request submitted successfully',
        data: appointment,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}


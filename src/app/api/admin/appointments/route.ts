// src/app/api/admin/appointments/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, unauthorizedResponse } from '@/lib/supabase-auth'

// GET - List all appointments (admin only)
export async function GET() {
  try {
    await requireAdmin()
  } catch (error) {
    return unauthorizedResponse('Admin access required')
  }

  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        appointmentDate: 'asc',
      },
    })

    return NextResponse.json({ success: true, data: appointments })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

// PATCH - Update appointment status (admin only)
export async function PATCH(request: Request) {
  try {
    await requireAdmin()
  } catch (error) {
    return unauthorizedResponse('Admin access required')
  }

  try {
    const body = await request.json()
    const { id, status, notes } = body

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: id, status' },
        { status: 400 }
      )
    }

    const updateData: any = { status }
    if (notes !== undefined) {
      updateData.notes = notes
    }

    const appointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: updateData,
    })

    return NextResponse.json({ success: true, data: appointment })
  } catch (error: any) {
    console.error('Error updating appointment:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update appointment' },
      { status: 500 }
    )
  }
}
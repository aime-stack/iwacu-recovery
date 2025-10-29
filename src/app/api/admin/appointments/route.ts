import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        appointmentDate: "asc",
      },
    });
    return new Response(JSON.stringify(appointments), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch appointments" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
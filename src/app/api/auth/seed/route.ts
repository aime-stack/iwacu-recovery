import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@iwacu.org";
    const adminPassword = process.env.ADMIN_PASSWORD || "Iwacu2025!";

    const existing = await prisma.staffUser.findUnique({ where: { email: adminEmail } });
    if (existing) {
      return NextResponse.json({ success: true, message: "Admin already exists" });
    }

    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.staffUser.create({
      data: {
        email: adminEmail,
        passwordHash,
        role: "admin",
      },
    });

    return NextResponse.json({ success: true, message: "Admin user created" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to seed admin" }, { status: 500 });
  }
}



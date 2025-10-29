import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")
    ?.split(";")
    .find((c) => c.trim().startsWith("authToken="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  const verified = verifyToken(token);

  if (!verified) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  return NextResponse.json({ valid: true, email: verified.email });
}


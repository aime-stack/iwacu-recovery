// src/app/api/donate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    console.log("=== Donation API called ===");
    
    // Use FLW_SECRET_KEY or FLUTTERWAVE_SECRET_KEY
    const FLUTTERWAVE_KEY = process.env.FLW_SECRET_KEY || process.env.FLUTTERWAVE_SECRET_KEY;
    const MOCK_MODE = !FLUTTERWAVE_KEY;
    
    console.log("Mock mode:", MOCK_MODE);
    console.log("Has Flutterwave key:", !!FLUTTERWAVE_KEY);
    console.log("FLW_SECRET_KEY exists:", !!process.env.FLW_SECRET_KEY);
    console.log("FLUTTERWAVE_SECRET_KEY exists:", !!process.env.FLUTTERWAVE_SECRET_KEY);
    
    let body;
    try {
      body = await request.json();
      console.log("Request body:", body);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { name, email, amount, sponsorName } = body;

    if (!name || !email || !amount) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields: name, email, and amount are required" },
        { status: 400 }
      );
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      console.log("Invalid amount:", amount);
      return NextResponse.json(
        { error: "Invalid donation amount. Must be a positive number." },
        { status: 400 }
      );
    }

    const txRef = `IRC-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    console.log("Generated transaction reference:", txRef);

    let donation;
    try {
      donation = await prisma.donation.create({
        data: {
          name,
          email,
          amount: numericAmount,
          transactionId: txRef,
          status: "pending",
          sponsorName: sponsorName || null, 
        },
      });
      console.log("Donation record created:", donation.id);
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { 
          error: "Failed to create donation record",
          details: dbError instanceof Error ? dbError.message : "Unknown database error"
        },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    `${request.nextUrl.protocol}//${request.nextUrl.host}`;

    // MOCK MODE - Skip Flutterwave integration
    if (MOCK_MODE) {
      console.log("⚠️ MOCK MODE: Skipping Flutterwave integration");
      const mockPaymentLink = `${baseUrl}/api/donate/verify?tx_ref=${txRef}&status=successful&mock=true`;
      console.log("Mock payment link:", mockPaymentLink);
      
      return NextResponse.json({
        success: true,
        paymentLink: mockPaymentLink,
        transactionId: txRef,
        mockMode: true,
      });
    }

    // REAL MODE - Use Flutterwave
    const flutterwavePayload = {
      tx_ref: txRef,
      amount: numericAmount.toString(),
      currency: "USD",
      redirect_url: `${baseUrl}/api/donate/verify?tx_ref=${txRef}`,
      customer: {
        email,
        name,
      },
      customizations: {
        title: "Iwacu Recovery Centre",
        description: sponsorName
          ? `Donation for ${sponsorName}`
          : "General Donation",
        logo: `${baseUrl}/logo.png`,
      },
      meta: {
        donation_id: donation.id,
        sponsor_name: sponsorName || null,
      },
    };

    console.log("Calling Flutterwave API...");

    const flutterwaveResponse = await fetch(
      "https://api.flutterwave.com/v3/payments",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flutterwavePayload),
      }
    );

    const flutterwaveData = await flutterwaveResponse.json();
    console.log("Flutterwave response:", JSON.stringify(flutterwaveData, null, 2));

    if (flutterwaveData.status !== "success" || !flutterwaveData.data?.link) {
      console.error("Flutterwave payment initialization failed");
      
      await prisma.donation.update({
        where: { id: donation.id },
        data: { status: "failed" },
      });

      return NextResponse.json(
        { 
          error: flutterwaveData.message || "Payment initialization failed",
          details: flutterwaveData 
        },
        { status: 500 }
      );
    }

    console.log("Payment link generated successfully");

    return NextResponse.json({
      success: true,
      paymentLink: flutterwaveData.data.link,
      transactionId: txRef,
    });
  } catch (error) {
    console.error("=== Unexpected error in donation API ===");
    console.error("Error:", error);
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
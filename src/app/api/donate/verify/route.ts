// src/app/api/donate/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  console.log("=== Payment Verification Route Hit ===");
  console.log("Full URL:", request.url);
  
  try {
    const searchParams = request.nextUrl.searchParams;
    const txRef = searchParams.get("tx_ref");
    const status = searchParams.get("status");
    const transactionId = searchParams.get("transaction_id");

    console.log("Transaction params:", { txRef, status, transactionId });

    // Build base URL from request
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;
    
    console.log("Base URL:", baseUrl);

    if (!txRef) {
      console.log("Missing tx_ref - redirecting to error");
      return NextResponse.redirect(`${baseUrl}/thank-you?status=error`, 302);
    }

    // If payment was cancelled
    if (status === "cancelled") {
      console.log("Payment was cancelled");
      try {
        await prisma.donation.update({
          where: { transactionId: txRef },
          data: { status: "failed" },
        });
        console.log("Database updated: cancelled");
      } catch (dbError) {
        console.error("Database error:", dbError);
      }
      return NextResponse.redirect(`${baseUrl}/thank-you?status=cancelled`, 302);
    }

    const FLUTTERWAVE_KEY = process.env.FLW_SECRET_KEY || process.env.FLUTTERWAVE_SECRET_KEY;

    if (!FLUTTERWAVE_KEY) {
      console.error("Missing Flutterwave key");
      return NextResponse.redirect(`${baseUrl}/thank-you?status=error`, 302);
    }

    // Verify payment with Flutterwave
    console.log("Calling Flutterwave verification API...");
    const verifyUrl = `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${txRef}`;
    
    const verifyResponse = await fetch(verifyUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Flutterwave response status:", verifyResponse.status);
    
    const verifyData = await verifyResponse.json();
    console.log("Flutterwave data:", JSON.stringify(verifyData, null, 2));

    // Check if payment was successful
    if (verifyData.status === "success" && verifyData.data?.status === "successful") {
      console.log("✅ Payment verified successfully");
      
      // Update database
      try {
        await prisma.donation.update({
          where: { transactionId: txRef },
          data: { status: "success" },
        });
        console.log("Database updated: success");
      } catch (dbError) {
        console.error("Database update error:", dbError);
      }

      const redirectUrl = `${baseUrl}/thank-you?status=success&amount=${verifyData.data.amount}&tx_ref=${txRef}`;
      console.log("Redirecting to:", redirectUrl);
      return NextResponse.redirect(redirectUrl, 302);
      
    } else {
      console.log("❌ Payment verification failed or payment not successful");
      
      // Update database
      try {
        await prisma.donation.update({
          where: { transactionId: txRef },
          data: { status: "failed" },
        });
        console.log("Database updated: failed");
      } catch (dbError) {
        console.error("Database update error:", dbError);
      }

      const redirectUrl = `${baseUrl}/thank-you?status=failed`;
      console.log("Redirecting to:", redirectUrl);
      return NextResponse.redirect(redirectUrl, 302);
    }
    
  } catch (error) {
    console.error("=== Verification Error ===");
    console.error(error);
    
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;
    
    const redirectUrl = `${baseUrl}/thank-you?status=error`;
    console.log("Error redirect to:", redirectUrl);
    return NextResponse.redirect(redirectUrl, 302);
  }
}
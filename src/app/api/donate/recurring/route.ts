// src/app/api/donate/recurring/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    console.log("=== Recurring Donation API called ===");
    
    const FLUTTERWAVE_KEY = process.env.FLW_SECRET_KEY || process.env.FLUTTERWAVE_SECRET_KEY;
    
    if (!FLUTTERWAVE_KEY) {
      console.error("Flutterwave key not configured");
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, amount, frequency, sponsorName } = body;

    console.log("Recurring donation request:", { name, email, amount, frequency });

    // Validate input
    if (!name || !email || !amount || !frequency) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid donation amount" },
        { status: 400 }
      );
    }

    // Generate unique plan ID
    const planId = `IRC-PLAN-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const txRef = `IRC-SUB-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Create subscription record
    const subscription = await prisma.subscription.create({
      data: {
        name,
        email,
        amount: numericAmount,
        frequency,
        planId,
        status: "active",
        sponsorName: sponsorName || null,
      },
    });

    console.log("Subscription record created:", subscription.id);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    `${request.nextUrl.protocol}//${request.nextUrl.host}`;

    // Create payment plan with Flutterwave
    const planPayload = {
      amount: numericAmount,
      name: `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} Donation - ${name}`,
      interval: frequency === "monthly" ? "monthly" : frequency === "quarterly" ? "quarterly" : "yearly",
      duration: 0, // Infinite until cancelled
      currency: "USD",
    };

    console.log("Creating Flutterwave payment plan...");
    const planResponse = await fetch(
      "https://api.flutterwave.com/v3/payment-plans",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planPayload),
      }
    );

    const planData = await planResponse.json();
    console.log("Plan creation response:", planData);

    if (planData.status !== "success" || !planData.data?.id) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: "cancelled" },
      });
      
      return NextResponse.json(
        { error: planData.message || "Failed to create payment plan" },
        { status: 500 }
      );
    }

    // Update subscription with Flutterwave plan ID
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { subscriptionId: planData.data.id.toString() },
    });

    // Initialize subscription payment
    const subscriptionPayload = {
      tx_ref: txRef,
      amount: numericAmount.toString(),
      currency: "USD",
      payment_plan: planData.data.id,
      redirect_url: `${baseUrl}/api/donate/verify-subscription?plan_id=${planId}&tx_ref=${txRef}`,
      customer: {
        email,
        name,
      },
      customizations: {
        title: "Iwacu Recovery Centre - Monthly Donation",
        description: sponsorName
          ? `Monthly donation for ${sponsorName}`
          : `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} donation`,
        logo: `${baseUrl}/logo.png`,
      },
      meta: {
        subscription_id: subscription.id,
        plan_id: planId,
        frequency,
      },
    };

    console.log("Initializing subscription payment...");
    const paymentResponse = await fetch(
      "https://api.flutterwave.com/v3/payments",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriptionPayload),
      }
    );

    const paymentData = await paymentResponse.json();
    console.log("Payment initialization response:", paymentData);

    if (paymentData.status !== "success" || !paymentData.data?.link) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: "cancelled" },
      });

      return NextResponse.json(
        { error: paymentData.message || "Failed to initialize payment" },
        { status: 500 }
      );
    }

    console.log("Recurring donation setup successful");

    return NextResponse.json({
      success: true,
      paymentLink: paymentData.data.link,
      planId,
      subscriptionId: subscription.id,
    });
  } catch (error) {
    console.error("=== Recurring donation error ===");
    console.error(error);
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
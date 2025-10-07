import crypto from 'crypto';

export interface EncryptableData {
  [key: string]: string | number | boolean | null | undefined | Record<string, unknown> | EncryptableData[];
}

export interface FlutterwaveConfig {
  publicKey: string;
  secretKey: string;
  encryptionKey: string;
}

export interface PaymentPayload {
  amount: number;
  currency: string;
  email: string;
  phone_number?: string;
  name: string;
  tx_ref: string;
  payment_options?: string;
  redirect_url: string;
  customizations?: {
    title?: string;
    description?: string;
    logo?: string;
  };
}

const config: FlutterwaveConfig = {
  publicKey: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
  secretKey: process.env.FLUTTERWAVE_SECRET_KEY!,
  encryptionKey: process.env.FLUTTERWAVE_ENCRYPTION_KEY!,
};

export const FLUTTERWAVE_API_URL = 'https://api.flutterwave.com/v3';

// Generate a unique transaction reference
export function generateTransactionRef(): string {
  return `IWACU-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
}

// Encrypt payload using Flutterwave's encryption key
export function encryptPayload(data: EncryptableData, encryptionKey: string): string {
  const key = Buffer.from(encryptionKey, 'base64');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  return encrypted;
}

// Initialize payment with Flutterwave
export async function initializePayment(payload: PaymentPayload): Promise<{ 
  status: string;
  message: string;
  data?: { 
    link: string;
  };
}> {
  try {
    const response = await fetch(`${FLUTTERWAVE_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.secretKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Payment initialization failed');
    }

    return await response.json();
  } catch (error: unknown) {  // Changed from 'any' to 'unknown'
    console.error('Flutterwave payment initialization error:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}

// Verify payment status
export async function verifyPayment(transactionId: string): Promise<{
  status: string;
  message: string;
  data: {
    status: string;
    amount: number;
    currency: string;
    customer: {
      email: string;
      phone_number: string;
      name: string;
    };
  };
}> {
  try {
    const response = await fetch(
      `${FLUTTERWAVE_API_URL}/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${config.secretKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Flutterwave payment verification error:', error);
    throw error;
  }
}
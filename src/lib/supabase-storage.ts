// src/lib/supabase-storage.ts
import { createSupabaseAdminClient } from './supabase'

export type UploadOptions = {
  bucket: string
  path: string
  file: File | Buffer
  contentType?: string
  upsert?: boolean
}

export type DeleteOptions = {
  bucket: string
  path: string
}

/**
 * Upload a file to Supabase Storage
 * @param options Upload configuration
 * @returns Public URL of the uploaded file
 */
export async function uploadToSupabaseStorage(
  options: UploadOptions
): Promise<{ url: string; path: string }> {
  const supabase = createSupabaseAdminClient()

  const fileBuffer =
    options.file instanceof File ? await options.file.arrayBuffer() : options.file
  
  // Fix: Handle both ArrayBuffer and Buffer types properly
  const fileData = fileBuffer instanceof Buffer 
    ? fileBuffer 
    : Buffer.from(new Uint8Array(fileBuffer))

  const { data, error } = await supabase.storage
    .from(options.bucket)
    .upload(options.path, fileData, {
      contentType: options.contentType || 'image/jpeg',
      upsert: options.upsert || false,
    })

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`)
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(options.bucket).getPublicUrl(data.path)

  return {
    url: publicUrl,
    path: data.path,
  }
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFromSupabaseStorage(
  options: DeleteOptions
): Promise<void> {
  const supabase = createSupabaseAdminClient()

  const { error } = await supabase.storage
    .from(options.bucket)
    .remove([options.path])

  if (error) {
    throw new Error(`Failed to delete file: ${error.message}`)
  }
}

/**
 * Generate a unique file path for uploads
 */
export function generateStoragePath(
  prefix: string,
  filename: string,
  userId?: string
): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
  
  const userPrefix = userId ? `${userId}/` : ''
  return `${prefix}/${userPrefix}${timestamp}-${randomString}-${sanitizedFilename}`
}

/**
 * Get public URL for a file in Supabase Storage
 */
export function getSupabaseStorageUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
}

/**
 * Validate file type and size
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.',
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 5MB limit.',
    }
  }

  return { valid: true }
}
// src/app/api/gallery/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, unauthorizedResponse } from '@/lib/supabase-auth'
import {
  uploadToSupabaseStorage,
  validateImageFile,
  generateStoragePath,
} from '@/lib/supabase-storage'

// GET - List gallery images (public)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where: any = {}
    if (category) {
      where.category = category
    }

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json({ success: true, data: images })
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery images' },
      { status: 500 }
    )
  }
}

// POST - Upload new gallery image (admin only)
export async function POST(request: Request) {
  try {
    await requireAdmin()
  } catch (error) {
    return unauthorizedResponse('Admin access required')
  }

  try {
    const formData = await request.formData()

    const imageFile = formData.get('image') as File | null
    const title = formData.get('title') as string
    const alt = formData.get('alt') as string || title
    const description = formData.get('description') as string || null
    const category = formData.get('category') as string
    const displayOrder = parseInt(formData.get('displayOrder') as string) || 0

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json(
        { success: false, error: 'Image file is required' },
        { status: 400 }
      )
    }

    if (!title || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, category' },
        { status: 400 }
      )
    }

    // Validate image file
    const validation = validateImageFile(imageFile)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    // Upload to Supabase Storage
    const path = generateStoragePath('gallery', imageFile.name)
    const uploadResult = await uploadToSupabaseStorage({
      bucket: 'gallery',
      path,
      file: imageFile,
      contentType: imageFile.type,
    })

    // Create database record
    const galleryImage = await prisma.galleryImage.create({
      data: {
        src: uploadResult.url, // Legacy field
        imageUrl: uploadResult.url,
        storagePath: uploadResult.path,
        title,
        alt,
        description,
        category,
        displayOrder,
      },
    })

    return NextResponse.json({ success: true, data: galleryImage }, { status: 201 })
  } catch (error: any) {
    console.error('Error uploading gallery image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload gallery image' },
      { status: 500 }
    )
  }
}


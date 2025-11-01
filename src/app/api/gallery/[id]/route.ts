// src/app/api/gallery/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, unauthorizedResponse } from '@/lib/supabase-auth'
import {
  uploadToSupabaseStorage,
  deleteFromSupabaseStorage,
  validateImageFile,
  generateStoragePath,
} from '@/lib/supabase-storage'

// GET - Get single gallery image (public)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const imageId = parseInt(id)

    if (isNaN(imageId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image ID' },
        { status: 400 }
      )
    }

    const image = await prisma.galleryImage.findUnique({
      where: { id: imageId },
    })

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: image })
  } catch (error) {
    console.error('Error fetching gallery image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery image' },
      { status: 500 }
    )
  }
}

// PATCH - Update gallery image metadata or replace image (admin only)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()
  } catch (error) {
    return unauthorizedResponse('Admin access required')
  }

  try {
    const { id } = await params
    const imageId = parseInt(id)

    if (isNaN(imageId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image ID' },
        { status: 400 }
      )
    }

    const existingImage = await prisma.galleryImage.findUnique({
      where: { id: imageId },
    })

    if (!existingImage) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      )
    }

    const formData = await request.formData()
    const updateData: any = {}

    // Handle metadata fields
    if (formData.has('title')) updateData.title = formData.get('title') as string
    if (formData.has('alt')) updateData.alt = formData.get('alt') as string
    if (formData.has('description')) {
      updateData.description = formData.get('description') as string || null
    }
    if (formData.has('category')) updateData.category = formData.get('category') as string
    if (formData.has('displayOrder')) {
      updateData.displayOrder = parseInt(formData.get('displayOrder') as string)
    }

    // Handle image replacement
    const imageFile = formData.get('image') as File | null
    if (imageFile && imageFile.size > 0) {
      const validation = validateImageFile(imageFile)
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.error },
          { status: 400 }
        )
      }

      // Delete old image
      if (existingImage.storagePath) {
        try {
          await deleteFromSupabaseStorage({
            bucket: 'gallery',
            path: existingImage.storagePath,
          })
        } catch (error) {
          console.warn('Failed to delete old image:', error)
        }
      }

      // Upload new image
      const path = generateStoragePath('gallery', imageFile.name)
      const uploadResult = await uploadToSupabaseStorage({
        bucket: 'gallery',
        path,
        file: imageFile,
        contentType: imageFile.type,
      })

      updateData.src = uploadResult.url // Legacy field
      updateData.imageUrl = uploadResult.url
      updateData.storagePath = uploadResult.path
    }

    const updatedImage = await prisma.galleryImage.update({
      where: { id: imageId },
      data: updateData,
    })

    return NextResponse.json({ success: true, data: updatedImage })
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update gallery image' },
      { status: 500 }
    )
  }
}

// DELETE - Delete gallery image (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()
  } catch (error) {
    return unauthorizedResponse('Admin access required')
  }

  try {
    const { id } = await params
    const imageId = parseInt(id)

    if (isNaN(imageId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image ID' },
        { status: 400 }
      )
    }

    const image = await prisma.galleryImage.findUnique({
      where: { id: imageId },
    })

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      )
    }

    // Delete from storage
    if (image.storagePath) {
      try {
        await deleteFromSupabaseStorage({
          bucket: 'gallery',
          path: image.storagePath,
        })
      } catch (error) {
        console.warn('Failed to delete image from storage:', error)
      }
    }

    // Delete from database
    await prisma.galleryImage.delete({
      where: { id: imageId },
    })

    return NextResponse.json({ success: true, message: 'Image deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery image' },
      { status: 500 }
    )
  }
}


// src/app/api/articles/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, unauthorizedResponse } from '@/lib/supabase-auth'
import {
  uploadToSupabaseStorage,
  deleteFromSupabaseStorage,
  validateImageFile,
  generateStoragePath,
} from '@/lib/supabase-storage'

// GET - Get single article (public)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const articleId = parseInt(id)

    if (isNaN(articleId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid article ID' },
        { status: 400 }
      )
    }

    const article = await prisma.article.findUnique({
      where: { id: articleId },
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: article })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}

// PATCH - Update article (admin only)
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
    const articleId = parseInt(id)

    if (isNaN(articleId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid article ID' },
        { status: 400 }
      )
    }

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id: articleId },
    })

    if (!existingArticle) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    const formData = await request.formData()
    const updateData: any = {}

    // Handle text fields
    if (formData.has('title')) updateData.title = formData.get('title') as string
    if (formData.has('slug')) updateData.slug = formData.get('slug') as string
    if (formData.has('category')) updateData.category = formData.get('category') as string
    if (formData.has('excerpt')) updateData.excerpt = formData.get('excerpt') as string
    if (formData.has('content')) updateData.content = formData.get('content') as string
    if (formData.has('author')) updateData.author = formData.get('author') as string || null

    // Handle published status
    if (formData.has('published')) {
      const published = formData.get('published') === 'true'
      updateData.published = published
      updateData.publishedAt = published ? new Date() : null
    }

    // Handle image upload
    const imageFile = formData.get('image') as File | null
    if (imageFile && imageFile.size > 0) {
      // Validate image
      const validation = validateImageFile(imageFile)
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.error },
          { status: 400 }
        )
      }

      // Delete old image if exists
      if (existingArticle.storagePath) {
        try {
          await deleteFromSupabaseStorage({
            bucket: 'articles',
            path: existingArticle.storagePath,
          })
        } catch (error) {
          console.warn('Failed to delete old image:', error)
          // Continue even if deletion fails
        }
      }

      // Upload new image
      const path = generateStoragePath('articles', imageFile.name)
      const uploadResult = await uploadToSupabaseStorage({
        bucket: 'articles',
        path,
        file: imageFile,
        contentType: imageFile.type,
      })

      updateData.imageUrl = uploadResult.url
      updateData.storagePath = uploadResult.path
    }

    // Handle image deletion (if 'removeImage' is true)
    if (formData.get('removeImage') === 'true' && existingArticle.storagePath) {
      try {
        await deleteFromSupabaseStorage({
          bucket: 'articles',
          path: existingArticle.storagePath,
        })
      } catch (error) {
        console.warn('Failed to delete image:', error)
      }
      updateData.imageUrl = null
      updateData.storagePath = null
    }

    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: updateData,
    })

    return NextResponse.json({ success: true, data: updatedArticle })
  } catch (error: any) {
    console.error('Error updating article:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'An article with this slug already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update article' },
      { status: 500 }
    )
  }
}

// DELETE - Delete article (admin only)
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
    const articleId = parseInt(id)

    if (isNaN(articleId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid article ID' },
        { status: 400 }
      )
    }

    // Get article to access storage path
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    // Delete image from storage if exists
    if (article.storagePath) {
      try {
        await deleteFromSupabaseStorage({
          bucket: 'articles',
          path: article.storagePath,
        })
      } catch (error) {
        console.warn('Failed to delete image from storage:', error)
        // Continue with database deletion even if storage deletion fails
      }
    }

    // Delete article from database
    await prisma.article.delete({
      where: { id: articleId },
    })

    return NextResponse.json({ success: true, message: 'Article deleted successfully' })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete article' },
      { status: 500 }
    )
  }
}


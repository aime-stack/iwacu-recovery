// src/app/api/articles/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, unauthorizedResponse } from '@/lib/supabase-auth'
import { uploadToSupabaseStorage, validateImageFile, generateStoragePath } from '@/lib/supabase-storage'

// GET - List all articles (public, but filter published by default)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const category = searchParams.get('category')
    const includeUnpublished = searchParams.get('all') === 'true'

    const where: any = {}
    
    // Only show published articles unless 'all=true' is specified
    if (!includeUnpublished) {
      where.published = true
    }
    
    if (published !== null) {
      where.published = published === 'true'
    }
    
    if (category) {
      where.category = category
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: {
        publishedAt: 'desc',
      },
    })

    return NextResponse.json({ success: true, data: articles })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

// POST - Create new article (admin only)
export async function POST(request: Request) {
  try {
    await requireAdmin()
  } catch (error) {
    return unauthorizedResponse('Admin access required')
  }

  try {
    const formData = await request.formData()
    
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string || title.toLowerCase().replace(/\s+/g, '-')
    const category = formData.get('category') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const author = formData.get('author') as string || null
    const published = formData.get('published') === 'true'
    const imageFile = formData.get('image') as File | null

    // Validate required fields
    if (!title || !category || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, category, content' },
        { status: 400 }
      )
    }

    let imageUrl: string | null = null
    let storagePath: string | null = null

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      const validation = validateImageFile(imageFile)
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.error },
          { status: 400 }
        )
      }

      const path = generateStoragePath('articles', imageFile.name)
      const uploadResult = await uploadToSupabaseStorage({
        bucket: 'articles',
        path,
        file: imageFile,
        contentType: imageFile.type,
      })

      imageUrl = uploadResult.url
      storagePath = uploadResult.path
    }

    // Create article
    const article = await prisma.article.create({
      data: {
        title,
        slug,
        category,
        excerpt,
        content,
        author,
        imageUrl,
        storagePath,
        published,
        publishedAt: published ? new Date() : null,
      },
    })

    return NextResponse.json({ success: true, data: article }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating article:', error)
    
    // Handle unique constraint violation (duplicate slug)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'An article with this slug already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create article' },
      { status: 500 }
    )
  }
}


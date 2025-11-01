// scripts/seed-articles-from-tsx.js
// Extracts articles from src/lib/articles.tsx and seeds them into database
// This script parses the TypeScript file directly

const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// Improved parser for TypeScript/JSX article definitions
function extractArticles() {
  const filePath = path.join(process.cwd(), 'src/lib/articles.tsx')
  const content = fs.readFileSync(filePath, 'utf-8')
  const articles = []

  // Extract all article arrays (articles, mentalHealthArticles, wellnessTipsArticles)
  const arrayPattern = /export const \w+Articles: Article\[\] = \[([\s\S]*?)\];/g
  const spreadPattern = /\.\.\.(\w+Articles)/g

  // Find main articles array
  const mainArticlesMatch = content.match(/export const articles: Article\[\] = \[([\s\S]+?)\];/)
  if (!mainArticlesMatch) {
    throw new Error('Could not find main articles array')
  }

  const mainContent = mainArticlesMatch[1]
  
  // Parse individual article objects
  // Look for patterns like: { id: 1, title: "...", ...
  const articleObjectPattern = /\{\s*id:\s*(\d+),[\s\S]*?title:\s*"((?:[^"\\]|\\.)*)",[\s\S]*?slug:\s*"((?:[^"\\]|\\.)*)",[\s\S]*?author:\s*"((?:[^"\\]|\\.)*)",[\s\S]*?date:\s*"((?:[^"\\]|\\.)*)",[\s\S]*?excerpt:\s*"((?:[^"\\]|\\.)*)",[\s\S]*?content:\s*`([^`]*)`,[\s\S]*?category:\s*'([^']+)'/g

  let match
  while ((match = articleObjectPattern.exec(content)) !== null) {
    articles.push({
      id: parseInt(match[1]),
      title: match[2],
      slug: match[3],
      author: match[4],
      date: match[5],
      excerpt: match[6],
      content: match[7],
      category: match[8],
    })
  }

  // If regex didn't capture all, try manual parsing
  if (articles.length === 0) {
    return parseArticlesManually(content)
  }

  return articles
}

function parseArticlesManually(content) {
  const articles = []
  
  // Split by article objects
  const articleBlocks = content.split(/\{\s*id:/).slice(1) // Skip first empty

  for (const block of articleBlocks) {
    try {
      // Extract each field carefully
      const extractField = (field, type = 'string') => {
        let pattern
        if (type === 'string') {
          pattern = new RegExp(`${field}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's')
        } else if (type === 'template') {
          // Escape backticks properly
          pattern = new RegExp(`${field}:\\s*\`([^\`]*)\``, 's')
        } else if (type === 'category') {
          pattern = new RegExp(`${field}:\\s*'([^']+)'`, 's')
        }
        
        const match = block.match(pattern)
        return match ? match[1] : null
      }

      const extractNumber = (field) => {
        const match = block.match(new RegExp(`${field}:\\s*(\\d+)`, 's'))
        return match ? parseInt(match[1]) : null
      }

      const id = extractNumber('id')
      const title = extractField('title')
      const slug = extractField('slug')
      const author = extractField('author')
      const date = extractField('date')
      const excerpt = extractField('excerpt')
      const content = extractField('content', 'template')
      const category = extractField('category', 'category')

      if (id && title && slug) {
        articles.push({
          id,
          title,
          slug,
          author: author || 'Iwacu Recovery Centre',
          date: date || new Date().toISOString().split('T')[0],
          excerpt: excerpt || '',
          content: content || '',
          category: category || 'education',
        })
      }
    } catch (error) {
      console.warn('Error parsing article block:', error.message)
    }
  }

  return articles
}

async function main() {
  console.log('📰 Extracting articles from src/lib/articles.tsx...\n')

  try {
    const articles = extractArticles()
    console.log(`Found ${articles.length} articles to seed\n`)

    let seeded = 0
    let skipped = 0

    for (const article of articles) {
      try {
        // Convert date string to Date object for publishedAt
        const publishedDate = article.date ? new Date(article.date) : null
        
        await prisma.article.upsert({
          where: { slug: article.slug },
          create: {
            title: article.title,
            slug: article.slug,
            category: article.category,
            excerpt: article.excerpt || '',
            content: article.content,
            author: article.author || null,
            published: true,
            publishedAt: publishedDate || new Date(),
            imageUrl: null, // Will be set if article has image
            storagePath: null,
          },
          update: {
            title: article.title,
            category: article.category,
            excerpt: article.excerpt || '',
            content: article.content,
            author: article.author || null,
            published: true,
            publishedAt: publishedDate || new Date(),
          },
        })

        console.log(`✓ Seeded: ${article.title}`)
        seeded++
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`⚠ Skipped: ${article.title} (already exists)`)
          skipped++
        } else {
          console.error(`✗ Failed: ${article.title}`, error.message)
        }
      }
    }

    console.log(`\n✅ Complete!`)
    console.log(`   Seeded: ${seeded}`)
    console.log(`   Skipped: ${skipped}`)
    console.log(`\nNext step: Run image migration if articles have images:`)
    console.log(`   npm run migrate:images`)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()


/*
  Usage:
    node scripts/seed-articles.js ./articles.json

  JSON format (array of items):
  [
    {
      "title": "Recovery Tips for Families",
      "slug": "recovery-tips-for-families",
      "category": "wellness",
      "excerpt": "Practical ways to support loved ones in recovery.",
      "content": "<p>Full content here…</p>",
      "author": "Iwacu Team",
      "published": true,
      "publishedAt": "2025-10-28T10:00:00.000Z"
      // Optional in UI but NOT stored in DB unless you extend schema:
      // "image": "/images/articles/recovery.jpg",
      // "readTime": "5 min read"
    }
  ]
*/

const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const ALLOWED_CATEGORIES = new Set([
  "education",
  "recovery",
  "mental-health",
  "wellness",
]);

function usage(message) {
  if (message) console.error("Error:", message);
  console.log("\nUsage: node scripts/seed-articles.js <path-to-json>\n");
  process.exit(message ? 1 : 0);
}

function validate(item, index) {
  const missing = [];
  if (!item.title) missing.push("title");
  if (!item.slug) missing.push("slug");
  if (!item.category) missing.push("category");
  if (!item.excerpt) missing.push("excerpt");
  if (!item.content) missing.push("content");
  if (missing.length) {
    throw new Error(
      `Item at index ${index} missing: ${missing.join(", ")}`
    );
  }
  if (!ALLOWED_CATEGORIES.has(String(item.category))) {
    throw new Error(
      `Item at index ${index} has invalid category: ${item.category}. Allowed: ${[...ALLOWED_CATEGORIES].join(", ")}`
    );
  }
}

function normalize(item) {
  // Normalize and coerce types
  const published = typeof item.published === "boolean" ? item.published : true;
  let publishedAt = null;
  if (item.publishedAt) {
    const d = new Date(item.publishedAt);
    if (!isNaN(d.getTime())) publishedAt = d;
  } else if (published) {
    publishedAt = new Date();
  }

  return {
    title: String(item.title),
    slug: String(item.slug),
    category: String(item.category),
    excerpt: String(item.excerpt),
    content: String(item.content),
    author: item.author ? String(item.author) : null,
    published,
    publishedAt,
  };
}

async function main() {
  const jsonPath = process.argv[2];
  if (!jsonPath) usage("Missing <path-to-json> argument.");

  const abs = path.resolve(process.cwd(), jsonPath);
  if (!fs.existsSync(abs)) usage(`File not found: ${abs}`);

  console.log("Reading:", abs);
  const raw = fs.readFileSync(abs, "utf-8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    throw new Error("Invalid JSON file. " + e.message);
  }
  if (!Array.isArray(data)) usage("JSON must be an array of articles.");

  // Validate and normalize
  const records = data.map((item, idx) => {
    validate(item, idx);
    return normalize(item);
  });

  console.log(`Prepared ${records.length} articles.`);

  // Upsert by slug to avoid duplicates
  let upserted = 0;
  for (const rec of records) {
    await prisma.article.upsert({
      where: { slug: rec.slug },
      create: rec,
      update: {
        title: rec.title,
        category: rec.category,
        excerpt: rec.excerpt,
        content: rec.content,
        author: rec.author,
        published: rec.published,
        publishedAt: rec.publishedAt,
      },
    });
    upserted += 1;
  }

  console.log(`Done. Upserted ${upserted} articles.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });




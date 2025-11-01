/*
  Usage:
    node scripts/seed-gallery.js ./your-images.json

  JSON format (array of items):
  [
    {
      "src": "/gallery/event1.jpg",
      "alt": "Community Gathering",
      "title": "Annual Recovery Celebration",
      "description": "Celebrating milestones",
      "category": "Events",
      "displayOrder": 0
    }
  ]
*/

const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function printUsageAndExit(message) {
  if (message) {
    console.error("Error:", message);
  }
  console.log("\nUsage: node scripts/seed-gallery.js <path-to-json>\n");
  process.exit(message ? 1 : 0);
}

function validateItem(item, index) {
  const missing = [];
  if (!item.src) missing.push("src");
  if (!item.alt) missing.push("alt");
  if (!item.title) missing.push("title");
  if (!item.category) missing.push("category");

  if (missing.length > 0) {
    throw new Error(
      `Item at index ${index} is missing required fields: ${missing.join(", ")}`
    );
  }

  if (!item.src.startsWith("/")) {
    throw new Error(
      `Item at index ${index} has invalid src (must start with '/'): ${item.src}`
    );
  }
}

async function main() {
  const jsonPath = process.argv[2];
  if (!jsonPath) {
    printUsageAndExit("Missing <path-to-json> argument.");
  }

  const absolutePath = path.resolve(process.cwd(), jsonPath);
  if (!fs.existsSync(absolutePath)) {
    printUsageAndExit(`File not found: ${absolutePath}`);
  }

  console.log("Reading:", absolutePath);
  const raw = fs.readFileSync(absolutePath, "utf-8");

  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    throw new Error("Invalid JSON file. " + e.message);
  }

  if (!Array.isArray(data)) {
    throw new Error("JSON must be an array of gallery items.");
  }

  // Validate and normalize
  const records = data.map((item, idx) => {
    validateItem(item, idx);
    const src = String(item.src);
    return {
      src: src, // Legacy field
      imageUrl: src, // Required field - will be updated by image migration script
      alt: String(item.alt),
      title: String(item.title),
      description: item.description ? String(item.description) : null,
      category: String(item.category),
      // If displayOrder is missing/invalid, default to the array index
      displayOrder:
        typeof item.displayOrder === "number" && !Number.isNaN(item.displayOrder)
          ? item.displayOrder
          : idx,
    };
  });

  console.log(`Prepared ${records.length} records.`);

  // Insert in batches to avoid payload limits
  const BATCH_SIZE = 100;
  let createdTotal = 0;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const result = await prisma.galleryImage.createMany({
      data: batch,
      skipDuplicates: false, // set to true if you later add a unique constraint
    });
    createdTotal += result.count;
    console.log(
      `Inserted batch ${Math.floor(i / BATCH_SIZE) + 1}: +${result.count}`
    );
  }

  console.log(`Done. Inserted ${createdTotal} gallery items.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



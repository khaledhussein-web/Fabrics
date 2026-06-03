const path = require("path");
const db = require("../backend/db");

const CATEGORY_ID = 6;
const CATEGORY_NAME = "Standard and customize Trussing system";
const DESCRIPTION =
  "FT Truss product for standard and customized trussing system applications.";

const products = [
  "FT14",
  "FT21",
  "FT22",
  "FT23",
  "FT24",
  "FT31",
  "FT32",
  "FT33",
  "FT34",
  "FT42",
  "FT43",
  "FT44",
  "FTR4030",
  "HT32",
  "HT33",
  "HT34",
  "HT42",
  "HT43",
  "HT44",
  "TC35",
  "TC45",
  "TC55",
  "TS36R",
  "TT34",
  "TT44",
  "TT54M",
  "TT74M",
  "TT104M",
].map((code) => ({
  code,
  name_en: code,
  name_ar: code,
  description_en: DESCRIPTION,
  description_ar: DESCRIPTION,
  image_path: `/uploads/Trussing/FT-Truss/${code}.png`,
}));

async function getColumns(tableName) {
  const { rows } = await db.query(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position
    `,
    [tableName]
  );

  return new Set(rows.map((row) => row.column_name));
}

async function ensureCategory() {
  const columns = await getColumns("categories");
  const idColumn = columns.has("category_id") ? "category_id" : "id";

  const existing = await db.query(
    `SELECT * FROM categories WHERE ${idColumn} = $1 LIMIT 1`,
    [CATEGORY_ID]
  );

  if (existing.rowCount > 0) {
    await db.query(`UPDATE categories SET name = $1 WHERE ${idColumn} = $2`, [
      CATEGORY_NAME,
      CATEGORY_ID,
    ]);
    return;
  }

  const insertColumns = [];
  const values = [];

  if (columns.has("category_id")) {
    insertColumns.push("category_id");
    values.push(CATEGORY_ID);
  }

  if (columns.has("id")) {
    insertColumns.push("id");
    values.push(CATEGORY_ID);
  }

  insertColumns.push("name");
  values.push(CATEGORY_NAME);

  const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
  await db.query(
    `INSERT INTO categories (${insertColumns.join(", ")}) VALUES (${placeholders})`,
    values
  );
}

async function upsertProducts() {
  let inserted = 0;
  let updated = 0;

  for (const product of products) {
    const existing = await db.query(
      `
        SELECT product_id
        FROM products
        WHERE category_id = $1 AND name_en = $2
        LIMIT 1
      `,
      [CATEGORY_ID, product.name_en]
    );

    if (existing.rowCount > 0) {
      await db.query(
        `
          UPDATE products
          SET
            subcategory_id = NULL,
            name_ar = $1,
            description_en = $2,
            description_ar = $3,
            image_path = $4,
            parent_id = NULL,
            is_folder = false
          WHERE product_id = $5
        `,
        [
          product.name_ar,
          product.description_en,
          product.description_ar,
          product.image_path,
          existing.rows[0].product_id,
        ]
      );
      updated += 1;
      continue;
    }

    await db.query(
      `
        INSERT INTO products (
          subcategory_id,
          category_id,
          name_en,
          name_ar,
          description_en,
          description_ar,
          image_path,
          parent_id,
          is_folder
        )
        VALUES (NULL, $1, $2, $3, $4, $5, $6, NULL, false)
      `,
      [
        CATEGORY_ID,
        product.name_en,
        product.name_ar,
        product.description_en,
        product.description_ar,
        product.image_path,
      ]
    );
    inserted += 1;
  }

  return { inserted, updated };
}

async function main() {
  const imageFolder = path.resolve(
    __dirname,
    "..",
    "backend",
    "uploads",
    "Trussing",
    "FT-Truss"
  );

  await ensureCategory();
  const result = await upsertProducts();
  const count = await db.query(
    "SELECT COUNT(*)::int AS count FROM products WHERE category_id = $1",
    [CATEGORY_ID]
  );

  console.log(
    JSON.stringify(
      {
        category_id: CATEGORY_ID,
        category_name: CATEGORY_NAME,
        image_folder: imageFolder,
        ...result,
        total_category_products: count.rows[0].count,
      },
      null,
      2
    )
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.end());

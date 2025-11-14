/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("products", (table) => {
    // product_id [PK] integer - Primary Key and Auto-Incrementing
    table.increments("product_id").primary();

    // subcategory_id integer - Indexed for foreign key (assuming)
    table.integer("subcategory_id").index().nullable();

    // name_en character varying (150)
    table.string("name_en", 150).notNullable();

    // name_ar character varying (150)
    table.string("name_ar", 150).notNullable();

    // description_en text
    table.text("description_en").notNullable();

    // description_ar text
    table.text("description_ar").notNullable();

    // image_path character varying (255)
    table.string("image_path", 255).notNullable();

    // category_id integer - Indexed for foreign key (assuming)
    table.integer("category_id").index().notNullable();

    // Add standard created_at and updated_at columns (timestamps with time zone)
    table.timestamps(true, true);

    // Optional: Define Foreign Key relationships if those tables exist
    // table.foreign('subcategory_id').references('id').inTable('subcategories');
    // table.foreign('category_id').references('id').inTable('categories');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("products");
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("product_id").primary();
    table.integer("subcategory_id").index().nullable();
    table.string("name_en", 150).notNullable();
    table.string("name_ar", 150).notNullable();
    table.text("description_en").notNullable();
    table.text("description_ar").notNullable();
    table.string("image_path", 255).notNullable();
    table.integer("category_id").index().notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("products");
};

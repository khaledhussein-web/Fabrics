/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("contact_requests");
  if (!exists) {
    await knex.schema.createTable("contact_requests", (table) => {
      table.increments("id").primary();
      table.string("full_name", 100).notNullable();
      table.string("email", 150).notNullable();
      table.string("phone", 30).notNullable();
      table.text("message").notNullable();
      table.timestamp("submitted_at").notNullable().defaultTo(knex.fn.now());
      table.index(["submitted_at"], "contact_requests_submitted_at_idx");
    });
    return;
  }

  const hasPhone = await knex.schema.hasColumn("contact_requests", "phone");
  if (!hasPhone) {
    await knex.schema.alterTable("contact_requests", (table) => {
      table.string("phone", 30).nullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const exists = await knex.schema.hasTable("contact_requests");
  if (!exists) return;

  const hasPhone = await knex.schema.hasColumn("contact_requests", "phone");
  if (hasPhone) {
    await knex.schema.alterTable("contact_requests", (table) => {
      table.dropColumn("phone");
    });
  }
};

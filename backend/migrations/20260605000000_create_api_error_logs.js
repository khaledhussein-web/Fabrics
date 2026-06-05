/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("api_error_logs");
  if (exists) return;

  await knex.schema.createTable("api_error_logs", (table) => {
    table.bigIncrements("id").primary();
    table.string("request_id", 64).notNullable();
    table.integer("error_code").notNullable();
    table.smallint("http_status").notNullable();
    table.string("method", 10).notNullable();
    table.string("request_path", 500).notNullable();
    table.string("public_message", 500).notNullable();
    table.timestamp("created_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.index(["created_at"], "api_error_logs_created_at_idx");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("api_error_logs");
};

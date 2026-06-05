const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
dotenv.config({ path: path.resolve(__dirname, ".env"), override: true });

const dbPassword = process.env.DB_PASSWORD ?? process.env.DB_PASS;
const dbPort = Number(process.env.DB_PORT || 5432);
const migrations = {
  directory: path.resolve(__dirname, "migrations"),
  tableName: "knex_migrations",
};

const localConnection = {
  host: process.env.DB_HOST,
  port: dbPort,
  user: process.env.DB_USER,
  password: dbPassword,
  database: process.env.DB_NAME,
};

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || localConnection,
    migrations,
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL
      ? {
          connectionString: process.env.DATABASE_URL,
          ssl:
            process.env.DB_SSL === "true"
              ? { rejectUnauthorized: true }
              : undefined,
        }
      : localConnection,
    migrations,
  },
};

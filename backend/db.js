const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });

const dbPassword = process.env.DB_PASSWORD ?? process.env.DB_PASS;
const dbPort = Number(process.env.DB_PORT || 5432);
const missing = [];

if (!process.env.DATABASE_URL) {
  if (!process.env.DB_HOST) missing.push('DB_HOST');
  if (!process.env.DB_NAME) missing.push('DB_NAME');
  if (!process.env.DB_USER) missing.push('DB_USER');
  if (!dbPassword) missing.push('DB_PASSWORD');
}

if (!Number.isInteger(dbPort) || dbPort <= 0 || dbPort > 65535) {
  missing.push('valid DB_PORT');
}

if (missing.length > 0) {
  throw new Error(`Missing required database environment values: ${missing.join(', ')}`);
}

// Prefer DATABASE_URL in production platforms; support separate DB_* variables for local setup.
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
    })
  : new Pool({
      host: process.env.DB_HOST,
      port: dbPort,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: String(dbPassword),
    });

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;

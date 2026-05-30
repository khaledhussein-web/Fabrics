const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

<<<<<<< Updated upstream
dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });
=======
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });

const dbPassword = process.env.DB_PASSWORD ?? process.env.DB_PASS;

if (!dbPassword) {
  throw new Error(
    'Missing database password. Add DB_PASSWORD to backend/.env or the project root .env.'
  );
}
>>>>>>> Stashed changes

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
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

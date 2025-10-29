const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function fixImagePaths() {
  try {
    console.log('Fixing image_path entries in database...');

    // First, show current data
    const selectQuery = 'SELECT id, image_path FROM products ORDER BY id';
    const selectResult = await pool.query(selectQuery);
    console.log('Current data:');
    console.table(selectResult.rows);

    // Update records with quotes around them
    const updateQuery = `UPDATE products SET image_path = TRIM(BOTH '"' FROM image_path) WHERE image_path LIKE '"%"'`;
    const updateResult = await pool.query(updateQuery);
    console.log(`Updated ${updateResult.rowCount} rows`);

    // Update records with single quotes around them
    const updateQuery2 = `UPDATE products SET image_path = TRIM(BOTH ''' FROM image_path) WHERE image_path LIKE '''%'''`;
    const updateResult2 = await pool.query(updateQuery2);
    console.log(`Updated ${updateResult2.rowCount} rows with single quotes`);

    // Show fixed data
    const selectResult2 = await pool.query(selectQuery);
    console.log('Fixed data:');
    console.table(selectResult2.rows);

  } catch (error) {
    console.error('Error fixing database:', error);
  } finally {
    await pool.end();
  }
}

fixImagePaths();
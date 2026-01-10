// backend/fix_db.js
const pool = require('./db'); // This is your pg Pool connection

async function runDatabaseFixes() {
    console.log('🚀 Starting React Backend Fix: Adding Arabic column...');

    try {
        // Raw SQL is safest when your 'db.js' uses the 'pg' library
        const alterTableQuery = `
            DO $$ 
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name='subcategories' AND column_name='name_ar'
                ) THEN
                    ALTER TABLE public.subcategories
                    ADD COLUMN name_ar character varying(100);
                END IF;
            END $$;
        `;

        await pool.query(alterTableQuery);
        console.log('✅ Success: "name_ar" column is now in your database.');

    } catch (error) {
        console.error('❌ Database fix failed:', error.message);
    } finally {
        // Use .end() for PG Pool, NOT .destroy()
        await pool.end();
        console.log('Database connection closed.');
    }
}

runDatabaseFixes();
const pool = require('./db'); // Requires your existing database connection file

async function runDatabaseFixes() {
    console.log('Starting structural database fix: Adding Arabic column to subcategories...');

    try {
        // SQL query uses a transactional block (DO $$) to check for the column existence first.
        const alterTableQuery = `
            DO $$ 
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name='subcategories' AND column_name='name_ar'
                ) THEN
                    -- Add the Arabic name column (name_ar) for long-term multilingual support
                    ALTER TABLE public.subcategories
                    ADD COLUMN name_ar character varying(100);
                    
                    -- Optional: You may also need a description column later
                    -- ALTER TABLE public.subcategories
                    -- ADD COLUMN description_ar text;
                END IF;
            END $$;
        `;
        await pool.query(alterTableQuery);
        console.log('✅ Subcategories table schema successfully updated with name_ar column.');

    } catch (error) {
        console.error('❌ An error occurred during database fix execution:', error.message);
    } finally {
        // Close the connection pool
        pool.end();
        console.log('Database connection closed.');
    }
}

runDatabaseFixes();
import { Pool } from 'pg';

// const DATABASE_DEV_URL='postgresql://neondb_owner:npg_0JEFNMgbhX2Y@ep-calm-glade-a1eucuu0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require';

const pool = new Pool({
  connectionString: process.env.DATABASE_DEV_URL,
});

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Connected! Postgres time is:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Connection failed:', err);
  } finally {
    await pool.end();
  }
}

testConnection();

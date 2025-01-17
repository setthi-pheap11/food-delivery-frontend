import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Required for production (Supabase, Heroku, etc.)
  },
});

pool.connect()
  .then(() => console.log('🟢 Connected to PostgreSQL database'))
  .catch((err) => console.error('🔴 Database connection error:', err));

export default pool;

import { Pool } from 'pg';

declare global {
  // Ensure we reuse the pool in dev to avoid exhausting connections
  var pgPool: Pool | undefined;
}

// Choose the correct connection string depending on environment
const connectionString =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_PROD_URL
    : process.env.DATABASE_DEV_URL;

export const pool =
  global.pgPool ??
  new Pool({
    connectionString,
  });

// Only attach to global in dev to prevent multiple pools during hot reloads
if (process.env.NODE_ENV !== 'production') {
  global.pgPool = pool;
}

import { Pool } from 'pg';

declare global {
  var pgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

export const pool =
  global.pgPool ??
  new Pool({
    connectionString,
  });

if (process.env.NODE_ENV !== 'production') {
  global.pgPool = pool;
}
// import mysql from 'mysql2/promise';

// declare global {
//   var mysqlPool: mysql.Pool | undefined;
// }
// export const pool =
//   global.mysqlPool ??
//   mysql.createPool({
//     host: process.env.DB_HOST || 'db',
//     user: process.env.DB_USER || 'devuser',
//     password: process.env.DB_PASSWORD || 'devpassword',
//     database: process.env.DB_NAME || 'movie_night',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   });

// if (process.env.NODE_ENV !== 'production') {
//   global.mysqlPool = pool;
// }

import { Pool } from 'pg';

declare global {
  var pgPool: Pool | undefined;
}

const DATABASE_DEV_URL='postgresql://neondb_owner:npg_0JEFNMgbhX2Y@ep-calm-glade-a1eucuu0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require';

export const pool =
  global.pgPool ??
  new Pool({
    connectionString: DATABASE_DEV_URL,
  });

if (process.env.NODE_ENV !== 'production') {
  global.pgPool = pool;
}

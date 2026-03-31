// # Table: users

import { DBUserInsert, DBUserRow } from '@/lib/types/db';
import { pool } from '../db';

// # GET USERS (LIST)
export async function getUsers(): Promise<DBUserRow[]> {
  const res = await pool.query(`
    SELECT id, name , image
    FROM users
    `);

  return res.rows as DBUserRow[];
}

// # CREATE USER
// # IF USER DOES NOT EXIST IN DB → CREATE USER
export async function upsertUser(user: DBUserInsert) {
  await pool.query(
    `
    INSERT INTO users(name, image, provider, provider_account_id)
    VALUES($1, $2, $3, $4)
    ON DUPLICATE KEY UPDATE name = VALUES(name), image = VALUES(image)
    `,
    [user.name, user.image, user.provider, user.providerAccountId],
  );
}

// # GET USER (SHOW)
// ## ( Get Individual USER by "provider_account_id" )
export async function getUserByProviderAccountId(
  providerAccountId: string,
): Promise<DBUserRow | null> {
  const res = await pool.query(
    `
  SELECT id, name, image
  FROM users
  WHERE provider_account_id = $1
  `,
    [providerAccountId],
  );

  if (res.rows.length === 0) return null;
  return res.rows[0] as DBUserRow;
}

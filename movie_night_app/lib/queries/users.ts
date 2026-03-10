// # Table: users

import { DBUser, DBUserRow } from "@/lib/types/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../db";

// # CREATE USER
// # IF USER DOES NOT EXIST IN DB → CREATE USER
export async function upsertUser(user: DBUser) {
  await pool.query<ResultSetHeader>(
    `INSERT INTO users(name, image, provider, provider_account_id) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE name = VALUES(name)`,
    [user.name, user.image, user.provider, user.providerAccountId],
  );
}

// # GET USER by "provider_account_id"
export async function getUserByProviderAccountId(
  providerAccountId: string,
): Promise<DBUserRow | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
  SELECT id, name, image
  FROM users
  WHERE provider_account_id = ?`,
    [providerAccountId],
  );

  if ((rows as DBUserRow[]).length === 0) return null;
  return (rows as DBUserRow[])[0];
}

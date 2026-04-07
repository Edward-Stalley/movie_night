// # Table: users
import { DBUserInsert, DBUserRow } from '@/lib/types/db';
import { pool } from '../db';
import { revalidateTag, unstable_cache } from 'next/cache';

// # GET USERS (LIST)
export const _getUsers = async (): Promise<DBUserRow[]> => {
  const res = await pool.query(`
    SELECT id, name , image
    FROM users
    `);

  return res.rows as DBUserRow[];
};

export const getUsers = unstable_cache(_getUsers, ['users'], {
  revalidate: 3600,
  tags: ['users'],
});

// # CREATE USER
// # IF USER DOES NOT EXIST IN DB → CREATE USER
export async function upsertUser(user: DBUserInsert) {
  await pool.query(
    `
    INSERT INTO users(name, image, provider, provider_account_id)
    VALUES($1, $2, $3, $4)
    ON CONFLICT (provider, provider_account_id)
    DO UPDATE SET name = EXCLUDED.name, image = EXCLUDED.image
    `,
    [user.name, user.image, user.provider, user.providerAccountId],
  );

  revalidateTag('users', 'max');
}

// # GET USER (SHOW)
// ## ( Get Individual USER by "provider_account_id" )
export const _getUserByProviderAccountId = async (
  providerAccountId: string,
): Promise<DBUserRow | null> => {
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
};

export const getUserByProviderAccountId = unstable_cache(
  _getUserByProviderAccountId,
  ['user-by-providerId'],
  {
    revalidate: 3600,
    tags: ['user-by-providerId'],
  },
);

import { pool } from '@/lib/db';

export async function notifySessionsUpdated() {
  console.log('in post gres eevnt');
  await pool.query('NOTIFY sessions_updated');
}
import { pool } from '@/lib/db';

export async function notifySessionsUpdated() {
  await pool.query('NOTIFY sessions_updated');
}

export async function notifyVotesUpdated(sessionId: number) {
  await pool.query(`NOTIFY votes_updated, '${sessionId}'`);
}

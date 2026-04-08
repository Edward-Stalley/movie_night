import { pool } from '@/lib/db';

export async function notifySessionsUpdated() {
  const msg = 'session updated';
  await pool.query(`NOTIFY sessions_updated , '${msg}'`);
}

export async function notifyVotesUpdated(sessionId: number) {
  await pool.query(`NOTIFY votes_updated, '${sessionId}'`);
}

import { getUsers } from '@/lib/queries/users';
import { getSessionRows } from '@/lib/queries/vote';
import { toUser, toVoteSession } from '@/lib/transform';
import { User, VoteSession } from '@/lib/types/domain';
import { connection } from 'next/server';
import SessionsLayout from '@/app/components/vote-session/SessionsLayout';
import { unstable_noStore as noStore } from 'next/cache';

export default async function VotingSessionsContent() {
  await connection();
  noStore();
  const sessionRows = await getSessionRows();
  const sessions: VoteSession[] = sessionRows.map(toVoteSession);

  const userRows = await getUsers();
  const users: User[] = userRows.map(toUser);

  return <SessionsLayout sessions={sessions} users={users} />;
}

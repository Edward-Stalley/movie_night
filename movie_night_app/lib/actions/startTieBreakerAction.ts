'use server';

import { updateSessionStatus } from '../queries/vote';
import { mapStatusToDb } from '../transform/voteSessionStatus';
import { VoteSessionStatusDomain } from '../types/domain';

export async function startTieBreakerAction(
  sessionId: number,
  sessionStatus: VoteSessionStatusDomain,
) {
  console.log('in tie breaker', sessionId, sessionStatus);

  const dbStatus = mapStatusToDb('tieBreaker');

  await updateSessionStatus(sessionId, dbStatus);
}

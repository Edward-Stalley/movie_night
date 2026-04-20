'use server';

import { updateSessionStatus } from '../queries/vote';
import { mapStatusToDb } from '../transform/voteSessionStatus';

export async function startTieBreakerAction(sessionId: number) {
  const dbStatus = mapStatusToDb('tieBreaker');

  await updateSessionStatus(sessionId, dbStatus);
}

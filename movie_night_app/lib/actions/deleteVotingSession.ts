'use server';

import { deleteVoteSession } from '@/lib/queries/vote';
import { revalidatePath } from 'next/cache';

export async function deleteVoteSessionAction(id: number) {
  revalidatePath('/vote-session'); // adjust to your route
  await deleteVoteSession(id);
}

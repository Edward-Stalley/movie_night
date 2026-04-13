'use server';

import { deleteVoteSession } from '@/lib/queries/vote';
<<<<<<< Updated upstream
// import { revalidatePath } from 'next/cache';
=======
import { revalidatePath } from 'next/cache';
>>>>>>> Stashed changes

export async function deleteVoteSessionAction(id: number) {
  revalidatePath('/vote-session'); // adjust to your route
  await deleteVoteSession(id);
}

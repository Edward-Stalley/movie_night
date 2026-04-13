'use server';

import { deleteVoteSession } from '@/lib/queries/vote';
<<<<<<< Updated upstream
// import { revalidatePath } from 'next/cache';
=======
import { revalidatePath } from 'next/cache';
>>>>>>> Stashed changes

export async function deleteVoteSessionAction(id: number) {
  await deleteVoteSession(id);
  // revalidatePath('/vote-session'); // adjust to your route
}

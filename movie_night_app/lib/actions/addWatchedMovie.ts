'use server';

import { addWatchedMovie } from '@/lib/queries/watched-movies';
import { WatchedMovieInsert } from '../types/db';

export async function addWatchedMovieAction({ movieId, watchedOn, chosenBy }: WatchedMovieInsert) {
  const vote = await addWatchedMovie({ movieId, watchedOn, chosenBy });
  return vote;
}

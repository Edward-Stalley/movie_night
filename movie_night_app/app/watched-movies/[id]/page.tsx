import { toWatchedMovies, toUser } from '@/lib/transform';
import type { User, WatchedMovie } from '@/lib/types/domain';
import { showWatchedMovie } from '@/lib/queries/watched-movies';
import WatchedMovieCard from '@/app/components/watchedMovies/WatchedMovieCard';
import { auth } from '@/auth';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { getUsers } from '@/lib/queries/users';
import { Suspense } from 'react';
import WatchedMovieDetail from './WatchedMovieDetail';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div>Loading Movie...</div>}>
      <WatchedMovieDetail params={params} />
    </Suspense>
  );
}

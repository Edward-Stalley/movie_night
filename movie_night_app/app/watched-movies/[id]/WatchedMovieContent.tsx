import { toWatchedMovies, toUser } from '@/lib/transform';
import type { User, WatchedMovie } from '@/lib/types/domain';
import { showWatchedMovie } from '@/lib/queries/watched-movies';
import WatchedMovieCard from '@/app/components/watchedMovies/WatchedMovieCard';
import { auth } from '@/auth';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { getUsers } from '@/lib/queries/users';

export default async function WatchedMovieContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);

  const session = await auth();
  const loggedInUser = mapSessionToLoggedInUser(session);

  const watchedMovierows = await showWatchedMovie(numericId);
  if (watchedMovierows === null) return <div>Movie Not Found</div>;
  const m: WatchedMovie = toWatchedMovies(watchedMovierows)[0];

  const userRows = await getUsers();
  const users: User[] = userRows.map(toUser);

  return (
    <ul className="list bg-base-300 rounded-box shadow-md flex-1 rounded-none">
      <li className=" text-base-content text-1xl font-bold p-4 pb-2 opacity-40 tracking-wide ">
        {m.title}
      </li>
      <WatchedMovieCard
        movie={m}
        key={`${m.id}+${m.movieId}`}
        layout={'list'}
        loggedInUser={loggedInUser}
        users={users}
        isDetailScreen={true}
        editMode={false}
      />
    </ul>
  );
}

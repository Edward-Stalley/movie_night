import { auth } from '@/app/auth';
import VoteSessionLayout from '@/app/components/vote-session/create/VoteSessionLayout';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { getSelectedMoviesByIds } from '@/lib/queries/movies';
import { getUsers } from '@/lib/queries/users';
import { getVoteSessionMovieRows } from '@/lib/queries/vote';
import { toStoredMovies, toUser, toVoteSessionMovie } from '@/lib/transform';
import { StoredMovie, User } from '@/lib/types/domain';

export default async function VotingSessionPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const sessionId = Number(resolvedParams.id);

  // TRANSFORM
  const sessionRows = await getVoteSessionMovieRows(sessionId);
  const voteSession = toVoteSessionMovie(sessionRows);

  if (!voteSession || !voteSession.movies.length) {
    throw new Error(`Voting session ${sessionId} has no movies`);
  }

  // AUTH
  const session = await auth();
  const loggedInUser = mapSessionToLoggedInUser(session);

  const ids = voteSession.movies.map((movie) => movie.id);

  const selectedMovieData = await getSelectedMoviesByIds(ids);
  const selectedMoviesList: StoredMovie[] = selectedMovieData.map(toStoredMovies);

  const userRows = await getUsers();
  const users: User[] = userRows.map(toUser);
  const createdBy = users.find((user) => Number(user.id) === voteSession.createdBy);
  if (!createdBy) {
    throw new Error(`Creator user ${voteSession.createdBy} not found`);
  }

  // const votes = await getVotes();

  return (
    <VoteSessionLayout
      movies={selectedMoviesList}
      users={users}
      loggedInUser={loggedInUser}
      createdBy={createdBy}
      voteSession={voteSession}
    />
  );
}

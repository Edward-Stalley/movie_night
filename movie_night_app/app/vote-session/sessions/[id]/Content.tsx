import { auth } from '@/auth';
import VoteSessionLayout from '@/app/components/vote-session/create/VoteSessionLayout';
import { mapSessionToLoggedInUser } from '@/lib/auth/session';
import { getSelectedMoviesByIds } from '@/lib/queries/movies';
import { getUsers } from '@/lib/queries/users';
import { getAllVotesForMovieSession, getVoteSessionMovieRows } from '@/lib/queries/vote';
import {
  countVotesByMovie,
  toStoredMovies,
  toUser,
  toVote,
  toVoteSessionMovie,
} from '@/lib/transform';
import { StoredMovie, User } from '@/lib/types/domain';
import { connection } from 'next/server';

export default async function VotingSessionContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();

  const { id } = await params;
  const numericId = Number(id);

  // TRANSFORM
  const sessionRows = await getVoteSessionMovieRows(numericId);
  const voteSession = toVoteSessionMovie(sessionRows);

  if (!voteSession || !voteSession.movies.length) {
    throw new Error(`Voting session ${numericId} has no movies`);
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

  const voteRows = await getAllVotesForMovieSession({ voteSessionId: numericId });
  const votes = voteRows.map(toVote);
  const votesByMovie = countVotesByMovie(votes, users);
  return (
    <VoteSessionLayout
      movies={selectedMoviesList}
      users={users}
      loggedInUser={loggedInUser}
      createdBy={createdBy}
      voteSession={voteSession}
      votesByMovie={votesByMovie}
    />
  );
}

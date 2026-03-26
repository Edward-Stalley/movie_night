import VoteMovieCard from '@/app/components/vote-session/create/VoteMovieCard';
import VoteSessionLayout from '@/app/components/vote-session/create/VoteSessionLayout';
import { getSelectedMoviesByIds } from '@/lib/queries/movies';
import { getUsers } from '@/lib/queries/users';
import { getVoteSessionRows } from '@/lib/queries/vote';
import { toStoredMovies, toUser, toVoteSession } from '@/lib/transform';
import { StoredMovie, User } from '@/lib/types/domain';

export default async function VotingSessionPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const sessionId = Number(resolvedParams.id);
  console.log('id test', sessionId, 'params', params);
  // TRANSFORM
  const sessionRows = await getVoteSessionRows(sessionId);
  const session = toVoteSession(sessionRows);

  if (!session || !session.movies.length) {
    throw new Error(`Voting session ${sessionId} has no movies`);
  }

  const ids = session.movies.map((movie) => movie.id);

  const selectedMovieData = await getSelectedMoviesByIds(ids);
  const selectedMoviesList: StoredMovie[] = selectedMovieData.map(toStoredMovies);

  const userRows = await getUsers();
  const users: User[] = userRows.map(toUser);

  const createdBy = users.find((user) => Number(user.id) === session.createdBy);

  return <VoteSessionLayout movies={selectedMoviesList} users={users} />;
}

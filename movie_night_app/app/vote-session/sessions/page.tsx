import { getUsers } from '@/lib/queries/users';
import { getSessionRows } from '@/lib/queries/vote';
import { toUser, toVoteSession } from '@/lib/transform';
import { User, VoteSession } from '@/lib/types/domain';
import Link from 'next/link';

export default async function VotingSessions() {
  const sessionRows = await getSessionRows();
  const sessions: VoteSession[] = sessionRows.map(toVoteSession);

  const userRows = await getUsers();
  const users: User[] = userRows.map(toUser);

  const sessionList = sessions.map((session) => {
    const createdBy = users.find((user) => Number(user.id) === session.createdBy);
    if (!createdBy) {
      throw new Error(`Creator user ${session.createdBy} not found`);
    }

    return (
      <Link
        className=" p-4 rounded-2xl text-2xl btn btn-primary w-fit  "
        key={session.id}
        href={`/vote-session/sessions/${session.id}`}
      >
        <div className="flex gap-4 w-xl justify-center items-center">
          <div className="">{session.id}.</div>
          <div className="flex justify-between w-full">
            <div className=" p-1 rounded-2xl  ">{createdBy.name}</div>
            <div className="">{session.movieNightDate.toDateString()}</div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className=" flex flex-col gap-2 m-2 ">
      <div className="text-6xl mb-10 ">Sessions List</div>
      {sessionList}
    </div>
  );
}

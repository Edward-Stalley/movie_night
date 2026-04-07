import { getUsers } from '@/lib/queries/users';
import { getSessionRows } from '@/lib/queries/vote';
import { toUser, toVoteSession } from '@/lib/transform';
import { User, VoteSession } from '@/lib/types/domain';
import Link from 'next/link';
import Image from 'next/image';
import getUserFromId from '@/lib/utils/users/getUsersFromIds';
import DeleteSessionButton from '@/app/components/vote-session/DeleteVoteSessionButton';
import { connection } from 'next/server';

export default async function VotingSessionsContent() {
  await connection();
  const sessionRows = await getSessionRows();
  const sessions: VoteSession[] = sessionRows.map(toVoteSession);

  const userRows = await getUsers();
  const users: User[] = userRows.map(toUser);

  const movieNightsession = sessions.map((session) => {
    const createdBy = getUserFromId(session.createdBy, users);

    if (!createdBy) {
      throw new Error(`Creator user ${session.createdBy} not found`);
    }

    return (
      <li
        key={session.id}
        className="list-row flex items-center justify-between p-3 my-2 rounded-2xl bg-base-200"
      >
        <Link
          key={session.id}
          href={`sessions/${session.id}`}
          className="flex flex-1 flex-col sm:flex-row sm:items-center gap-3"
        >
          <div className="text-3xl sm:text-4xl font-thin opacity-30 tabular-nums">
            Session {session.id}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <Image
                src={`${createdBy.image}`}
                alt={'user-image'}
                width={30}
                height={30}
                className="rounded-2xl h-auto w-auto "
              />
            </div>
            <div className="list-col-grow w-52">
              <div>{createdBy.name}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {session.movieNightDate.toDateString()}
              </div>
            </div>
          </div>

          <div>
            {session.status === 'inProgress' ? (
              <div className="badge badge-secondary ">Vote in Progress</div>
            ) : (
              <div className="badge badge-info opacity-50">Complete</div>
            )}
          </div>
        </Link>

        <div>
          <DeleteSessionButton id={session.id} className="rounded-full" />
        </div>
      </li>
    );
  });

  return (
    <div className=" flex flex-col gap-2 m-2 ">
      <div className="text-6xl mb-10 pl-2 badge badge-soft badge-secondary h-fit text-center  ">
        Movie Night Sessions
      </div>
      <div className="list">
        <ul className="list bg-base-100 rounded-box shadow-md">{movieNightsession}</ul>
      </div>
    </div>
  );
}

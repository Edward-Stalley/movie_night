'use client';

import { User, VoteSession } from '@/lib/types/domain';
import Link from 'next/link';
import Image from 'next/image';
import DeleteSessionButton from '@/app/components/vote-session/DeleteVoteSessionButton';

interface SessionsListProps {
  session: VoteSession;
  createdBy: User;
  onDeleted?: (id: number) => void;
}

export default function Session({ session, createdBy, onDeleted }: SessionsListProps) {
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
              {new Date(session.movieNightDate).toDateString()}
            </div>
          </div>
        </div>

        <div>
          {session.status === 'inProgress' ? (
            <div className="badge badge-info ">Vote in Progress</div>
          ) : (
            <div className="badge badge-neutral opacity-50">Complete</div>
          )}
        </div>
      </Link>

      <div>
        <DeleteSessionButton id={session.id} className="rounded-full" onDeleted={onDeleted} />
      </div>
    </li>
  );
}

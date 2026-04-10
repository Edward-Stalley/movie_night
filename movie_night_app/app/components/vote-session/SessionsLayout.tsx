'use client';

import { VoteSession, User } from '@/lib/types/domain';
import Session from './Session';
import getUserFromId from '@/lib/utils/users/getUsersFromIds';
import { useRouter } from 'next/navigation';

type SessionsLayoutProps = {
  sessions: VoteSession[];
  users: User[];
};

export default function SessionsLayout({ sessions, users }: SessionsLayoutProps) {
  const router = useRouter();

  const movieNightsession = sessions.map((session) => {
    const createdBy = getUserFromId(session.createdBy, users);

    if (!createdBy) {
      throw new Error(`Creator user ${session.createdBy} not found`);
    }
    return <Session session={session} createdBy={createdBy} key={session.id} />;
  });

  return (
    <div className=" flex flex-col gap-2 m-2 ">
      <div className="text-4xl pl-2 pb-2 pt-4 h-fit text-left ">
        Movie Night Sessions
      </div>
      <div className="list">
        <ul className="list bg-base-100 rounded-box shadow-md">{movieNightsession}</ul>
      </div>
      <button className="btn btn-soft btn-primary" onClick={() => router.refresh()}>
        Refresh Session List
      </button>
    </div>
  );
}

'use client';

import { VoteSession, User } from '@/lib/types/domain';
import Session from './Session';
import getUserFromId from '@/lib/utils/users/getUsersFromIds';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type SessionsLayoutProps = {
  sessions: VoteSession[];
  users: User[];
};

export default function SessionsLayout({ sessions, users }: SessionsLayoutProps) {
  const router = useRouter();

  const [sessionListState, setSessionListState] = useState(sessions);

  useEffect(() => {
    setSessionListState(sessions);
  }, [sessions]);

  const handleDeleteWatchedMovie = (deletedId: number) => {
    setSessionListState((prev) => prev.filter((s) => s.id !== deletedId));
    router.refresh();
  };

  const movieNightsession = sessionListState.map((session) => {
    const createdBy = getUserFromId(session.createdBy, users);

    if (!createdBy) {
      throw new Error(`Creator user ${session.createdBy} not found`);
    }
    return (
      <Session
        session={session}
        createdBy={createdBy}
        key={session.id}
        onDeleted={handleDeleteWatchedMovie}
      />
    );
  });

  return (
    <div className=" flex flex-col gap-2 p-2 bg-base-200 flex-1 ">
      <div className="text-xl pl-2 pb-2 pt-4 h-fit text-left ">Movie Night Sessions</div>
      <div className="flex justify-between flex-col flex-1">
        <>
          {/* <div className="list"> */}
          <ul className="list bg-base-200">{movieNightsession}</ul>
          {/* </div> */}
        </>
        <button
          className="btn btn-soft btn-primary rounded-2xl rounded-t-none"
          onClick={() => router.refresh()}
        >
          Refresh Session List
        </button>
      </div>
    </div>
  );
}

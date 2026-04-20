'use client';

import { VoteSession, User } from '@/lib/types/domain';
import Session from './Session';
import getUserFromId from '@/lib/utils/users/getUsersFromIds';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { ArrowPathIcon } from '@heroicons/react/16/solid';

type SessionsLayoutProps = {
  sessions: VoteSession[];
  users: User[];
};

export default function SessionsLayout({ sessions, users }: SessionsLayoutProps) {
  const router = useRouter();
  const headerTitle = 'Movie Night Sessions';
  const [sessionListState, setSessionListState] = useState(sessions);
  const [isPending, setTransition] = useTransition();

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
      <div className="flex justify-start mt-5">
        <h1 className="text-xl badge h-fit badge-primary badge-soft font-bold badge-outline text-center bg-base-300 ">
          {headerTitle}
        </h1>
      </div>
      <div className="flex justify-between flex-col flex-1">
        <>
          <ul className="list bg-base-200">{movieNightsession}</ul>
        </>
        <div className="flex justify-end gap-4">
          <button
            className="btn btn-soft rounded-xl w-fit"
            onClick={() =>
              setTransition(() => {
                router.refresh();
              })
            }
          >
            {isPending ? <div className="loading "></div> : <ArrowPathIcon className="h-5 w-5" />}
            <p>Refresh</p>
          </button>
        </div>
      </div>
    </div>
  );
}

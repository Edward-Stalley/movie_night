'use client';
import { WatchedMovie, User } from '@/lib/types/domain';
import { updateChosenBy } from '@/lib/api/watched-movies';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function ChosenByInput({ movie, users }: { movie: WatchedMovie; users: User[] }) {
  const router = useRouter();

  const handleChosenBySelect = async (user: User) => {
    await updateChosenBy(movie.id, user);
    router.refresh();
  };

  return (
    <div className="flex items-center ">
      <div className="flex justify-center items-center rounded-2xl h-8   ">
        <div>
          <div className=" h-8 flex  ">
            <button
              className="btn btn-outline btn-neutral-content h-6 rounded-4xl w-36 pr-2 "
              popoverTarget={`popover-${movie.id}`}
              style={{ anchorName: `--anchor-1-${movie.id}` }}
            >
              <span className="truncate min-w-0 flex-1 text-left text-xs">{`${movie.chosenByName ?? 'Select User'}`}</span>
              <ChevronDownIcon className="h-5 w-5 shrink-0 ml-4 " />
            </button>

            <ul
              className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm "
              popover="auto"
              id={`popover-${movie.id}`}
              style={{ positionAnchor: `--anchor-1-${movie.id}` }}
            >
              {users.map((user) => (
                <li key={`${user.id}-${user.name}`} className="">
                  <a className="" onClick={() => handleChosenBySelect(user)}>
                    {user.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

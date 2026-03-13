'use client';
import { WatchedMovie, User } from '@/lib/types/domain';
import { updateChosenBy } from '@/lib/api/watched-movies';
import { useRouter } from 'next/navigation';

export default function ChosenByInput({ movie, users }: { movie: WatchedMovie; users: User[] }) {
  const router = useRouter();

  const handleChosenBySelect = async (user: User) => {
    await updateChosenBy(movie.id, user);
    router.refresh();
  };

  return (
    <div className="flex pt-1 pb-1  items-center   ">
      <div className="flex justify-center items-center rounded-2xl bg-base-300 h-8 gap-2  ">
        <div>
          <div className=" h-8 flex justify-center items-center ">
            <button
              className="btn m-1 h-6 rounded-4xl"
              popoverTarget={`popover-${movie.id}`}
              style={{ anchorName: `--anchor-1-${movie.id}` }}
            >
              {`${movie.chosenBy ?? 'Select User'} ▼`}
            </button>

            <ul
              className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
              popover="auto"
              id={`popover-${movie.id}`}
              style={{ positionAnchor: `--anchor-1-${movie.id}` }}
            >
              {users.map((user) => (
                <li key={`${user.id}-${user.name}`}>
                  <a onClick={() => handleChosenBySelect(user)}>{user.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

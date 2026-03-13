'use client';
import { useState } from 'react';
import { WatchedMovie } from '@/lib/types/domain';
import { useRouter } from 'next/navigation';
import { updateWatchedOn } from '@/lib/api/watched-movies';
import { toIso } from '@/lib/transform';

export default function DateInput({ movie }: { movie: WatchedMovie }) {
  const [currentDate, setCurrentDate] = useState<string | undefined>(
    movie.watchedOn ? toIso(movie.watchedOn) : '',
  );

  const router = useRouter();

  const handleUpdateWatchedOn = async (watchedOn: string) => {
    setCurrentDate(watchedOn);
    await updateWatchedOn(movie.id, watchedOn);
    router.refresh();
  };

  return (
    <div className="flex pt-1 pb-1 gap- items-center  ">
      <div className="flex justify-center items-center p-1 gap-2 rounded-2xl bg-base-300 h-8">
        <div className="flex justify-center items-center   ">
          <div>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => handleUpdateWatchedOn(e.target.value)}
              className="input rounded-2xl h-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

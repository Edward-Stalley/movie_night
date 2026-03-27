'use client';
import { useState } from 'react';
import { WatchedMovie } from '@/lib/types/domain';
import { useRouter } from 'next/navigation';
import { updateWatchedOn } from '@/lib/api/watched-movies';
import { toIso } from '@/lib/transform';
import DateInput from '@/app/components/ui/DateInput';

export default function WatchedDateInput({ movie }: { movie: WatchedMovie }) {
  const [currentDate, setCurrentDate] = useState<string | undefined>(
    movie.watchedOn ? toIso(movie.watchedOn) : '',
  );

  const router = useRouter();

  const handleUpdateWatchedOn = async (watchedOn: string) => {
    setCurrentDate(watchedOn);
    await updateWatchedOn(movie.id, watchedOn);
    router.refresh();
  };

  return <DateInput date={currentDate} onChange={handleUpdateWatchedOn} />;
}

import { AddWatchedMovieButtonProps } from '@/lib/types/ui';
import { BookmarkIcon } from '@heroicons/react/20/solid';
import { useTransition } from 'react';

export function AddSearchedMovieToMoviesButton({ onAdd }: AddWatchedMovieButtonProps) {
  const [isPending, startTransition] = useTransition();
  const handleBookmark = () => {
    startTransition(() => {
      onAdd();
    });
  };
  return (
    <button
      onClick={handleBookmark}
      className=" btn btn-primary btn-soft  absolute bottom-0 rounded-t-none rounded-b-2xl w-full"
    >
      {isPending ? <div className="loading"></div> : <BookmarkIcon className="h-5 w-5" />}
    </button>
  );
}

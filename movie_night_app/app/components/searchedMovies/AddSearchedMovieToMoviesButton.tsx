import { AddWatchedMovieButtonProps } from '@/lib/types/ui';
import { BookmarkIcon, PlusCircleIcon } from '@heroicons/react/20/solid';

export function AddSearchedMovieToMoviesButton({ onAdd }: AddWatchedMovieButtonProps) {
  return (
    <button
      onClick={onAdd}
      className=" btn btn-primary btn-soft  absolute bottom-0 rounded-t-none rounded-b-2xl w-full"
      // className="opacity-0 group-hover:opacity-100 btn btn-primary btn-soft  absolute bottom-0 rounded-tr-2xl rounded-bl-2xl rounded-br-none rounded-tl-none"
    >
      <BookmarkIcon className="h-5 w-5" />
    </button>
  );
}

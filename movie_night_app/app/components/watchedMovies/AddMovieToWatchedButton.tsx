import { AddWatchedMovieButtonProps } from '@/lib/types/ui';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

export function AddMovieToWatchedButton({ onAdd }: AddWatchedMovieButtonProps) {
  return (
    <button
      onClick={onAdd}
      className="opacity-80 hover:opacity-100 btn btn-primary btn-soft  absolute bottom-0 rounded-b-2xl rounded-t-none w-full h-8"
    >
      <PlusCircleIcon className="h-5 w-5" />
    </button>
  );
}

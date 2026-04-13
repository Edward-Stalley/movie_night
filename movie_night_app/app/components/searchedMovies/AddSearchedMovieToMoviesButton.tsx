import { AddWatchedMovieButtonProps } from '@/lib/types/ui';

export function AddSearchedMovieToMoviesButton({ onAdd }: AddWatchedMovieButtonProps) {
  return (
    <button
      onClick={onAdd}
      className=" btn btn-primary btn-soft  absolute bottom-0 rounded-t-none rounded-b-2xl w-full"
      // className="opacity-0 group-hover:opacity-100 btn btn-primary btn-soft  absolute bottom-0 rounded-tr-2xl rounded-bl-2xl rounded-br-none rounded-tl-none"
    >
      +
    </button>
  );
}

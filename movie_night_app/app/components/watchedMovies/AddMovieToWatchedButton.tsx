import { AddWatchedMovieButtonProps } from '@/lib/types/ui';

export function AddMovieToWatchedButton({ onAdd }: AddWatchedMovieButtonProps) {
  return (
    <button
      onClick={onAdd}
      className=" btn btn-primary btn-soft  absolute bottom-0 rounded-b-2xl rounded-t-none w-full h-8"
      // className="opacity-0 group-hover:opacity-100 btn btn-primary btn-soft  absolute bottom-0 rounded-tr-2xl rounded-bl-2xl rounded-br-none rounded-tl-none"
    >
      +
    </button>
  );
}

import { DeleteMovieButtonProps } from '@/lib/types/ui';
import { TrashIcon } from '@heroicons/react/20/solid';

export function DeleteMovieButton({ onDelete }: DeleteMovieButtonProps) {
  return (
    <button
      onClick={onDelete}
      className={`hover:opacity-100 opacity-80 btn btn-secondary btn-soft absolute top-0 right-0  rounded-t-2xl  rounded-b-none h-8 w-full `}
    >
      <TrashIcon className="h-4 w-4" />
    </button>
  );
}

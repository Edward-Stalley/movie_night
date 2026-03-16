import { DeleteMovieButtonProps } from '@/lib/types/ui';

export function DeleteMovieButton({ onDelete, isDetailScreen }: DeleteMovieButtonProps) {
  return (
    <button
      onClick={onDelete}
      className={`${!isDetailScreen && 'opacity-0 group-hover:opacity-100'} btn btn-secondary btn-soft absolute top-0 right-0  rounded-tr-2xl rounded-br-none rounded-tl-none h-6 w-4`}
    >
      X
    </button>
  );
}

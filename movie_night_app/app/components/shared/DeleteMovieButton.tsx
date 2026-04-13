import { DeleteMovieButtonProps } from '@/lib/types/ui';

export function DeleteMovieButton({ onDelete }: DeleteMovieButtonProps) {
  return (
    <button
      onClick={onDelete}
      className={` btn btn-secondary btn-soft absolute top-0 right-0  rounded-t-2xl  rounded-b-none h-8 w-full`}
      // className={`${!isDetailScreen && 'opacity-0 group-hover:opacity-100'} btn btn-secondary btn-soft absolute top-0 right-0  rounded-tr-2xl rounded-br-none rounded-tl-none h-6 w-4`}
    >
      X
    </button>
  );
}

'use client';

type DeleteButtonProps = {
  onDelete: (id: number) => Promise<void>;
  id: number;
  className?: string;
  onDeleted?: (id: number) => void;
};

export default function DeleteButton({ onDelete, id, className, onDeleted }: DeleteButtonProps) {
  return (
    <button
      className={`btn btn-secondary btn-outline ${className}`}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await onDelete(id);
        onDeleted && onDeleted(id);
      }}
    >
      X
    </button>
  );
}

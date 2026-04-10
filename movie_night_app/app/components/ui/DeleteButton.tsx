'use client';

type DeleteButtonProps = {
  onDelete: (id: number) => Promise<void>;
  id: number;
  className?: string;
};

export default function DeleteButton({ onDelete, id, className }: DeleteButtonProps) {
  return (
    <button
      className={`btn btn-secondary btn-outline ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete(id);
      }}
    >
      X
    </button>
  );
}

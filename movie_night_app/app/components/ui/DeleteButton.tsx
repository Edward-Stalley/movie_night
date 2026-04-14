'use client';

import { TrashIcon } from '@heroicons/react/24/outline';

type DeleteButtonProps = {
  onDelete: (id: number) => Promise<void>;
  id: number;
  className?: string;
  onDeleted?: (id: number) => void;
};

export default function DeleteButton({ onDelete, id, className, onDeleted }: DeleteButtonProps) {
  return (
    <button
      className={`btn btn-secondary btn-outline p-2 ${className}`}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await onDelete(id);
        onDeleted && onDeleted(id);
      }}
    >
      <TrashIcon className="h-5 w-5" />
    </button>
  );
}

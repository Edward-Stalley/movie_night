'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type DeleteButtonProps = {
  onDelete: (id: number) => Promise<void>;
  id: number;
  className?: string;
  onDeleted?: (id: number) => void;
};

export default function DeleteButton({ onDelete, id, className, onDeleted }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: { preventDefault: () => void; stopPropagation: () => void }) => {
    try {
      setIsDeleting(true);
      e.preventDefault();
      e.stopPropagation();
      await onDelete(id);
      onDeleted && onDeleted(id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      className={`btn btn-secondary btn-outline p-2 ${className}`}
      onClick={(e) => {
        handleDelete(e);
      }}
    >
      {isDeleting ? <div className="loading loading-sm"></div> : <TrashIcon className="h-5 w-5" />}
    </button>
  );
}

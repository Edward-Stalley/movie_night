'use client';

import DeleteButton from '@/app/components/ui/DeleteButton';
import { deleteVoteSessionAction } from '@/lib/actions/deleteVotingSession';

export default function DeleteSessionButton({
  id,
  className,
  onDeleted,
}: {
  id: number;
  className: string;
  onDeleted?: (id: number) => void;
}) {
  return (
    <DeleteButton
      id={id}
      onDelete={deleteVoteSessionAction}
      className={className}
      onDeleted={onDeleted}
    />
  );
}

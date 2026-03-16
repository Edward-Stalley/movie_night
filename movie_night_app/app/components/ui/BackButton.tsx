'use client';

import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();
  return (
    <div>
      <button className="btn btn-primary btn-circle " onClick={() => router.back()}>
        ←
      </button>
    </div>
  );
}

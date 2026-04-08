'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LiveRefresh() {
  const router = useRouter();
  useEffect(() => {
    const es = new EventSource('/api/events');

    es.onmessage = (event) => {
      if (event.data === 'sessions-updated') {
        router.refresh();
      }
    };

    return () => es.close();
  }, [router]);

  return null;
}

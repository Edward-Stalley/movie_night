'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SessionListener() {
  const router = useRouter();

  useEffect(() => {
    const es = new EventSource('/api/events');

    const handleSessionsUpdated = () => {
      router.refresh();
    };

    es.addEventListener('sessions-updated', handleSessionsUpdated);

    return () => {
      es.removeEventListener('sessions-updated', handleSessionsUpdated);
      es.close();
    };
  }, [router]);

  return null;
}

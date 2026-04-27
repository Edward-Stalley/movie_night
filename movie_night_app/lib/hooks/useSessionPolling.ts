import { useEffect, useRef } from 'react';
import { VoidHandler } from '../types/ui';

type Status = 'inProgress' | 'completed' | 'tieBreaker';

type UseSessionPollingProps = {
  status: Status;
  refresh: VoidHandler;
};

export function useSessionPolling({ status, refresh }: UseSessionPollingProps) {
  const prevStatus = useRef(status);
  const burstRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    function startPolling(ms: number) {
      interval = setInterval(refresh, ms);
    }

    // OPEN voting → slow polling
    if (status === 'inProgress') {
      startPolling(8000);
    }

    // TIEBREAKER → fast polling
    if (status === 'tieBreaker') {
      startPolling(1000);
    }

    // CLOSED → burst polling for 15s
    if (prevStatus.current === 'inProgress' && status === 'completed') {
      startPolling(1000);
      burstRef.current = setTimeout(() => {
        if (interval) clearInterval(interval);
      }, 15000);
    }

    prevStatus.current = status;

    return () => {
      if (interval) clearInterval(interval);
      if (burstRef.current) clearTimeout(burstRef.current);
    };
  }, [status, refresh]);
}

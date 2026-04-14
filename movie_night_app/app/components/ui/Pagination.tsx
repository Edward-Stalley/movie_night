import { PaginationProps } from '@/lib/types/ui';
import { buildPageHref } from '@/lib/utils/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export default function Pagination({ page, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingPage, setPendingPage] = useState<number | null>(null);

  const baseBtn = 'join-item btn w-8 h-6 flex items-center justify-center';

  useEffect(() => {
    setPendingPage(null);
  }, [page]);

  const pageButtons = pages.map((p) => {
    const isTarget = p === pendingPage;

    return (
      <button
        key={p}
        onClick={() => goToPage(p)}
        disabled={isTarget}
        className={`
        ${baseBtn} ${p === page && !isPending && 'btn-active btn-primary btn-square'} 
        ${isTarget && 'loading loading-bars loading-xs bg-primary'}`}
      >
        {p}
      </button>
    );
  });

  const goToPage = (p: number) => {
    const href = buildPageHref(searchParams, { page: String(p) });

    setPendingPage(p);

    startTransition(() => {
      router.push(href);
    });
  };

  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);
  return (
    <div className="join">
      <button
        onClick={() => goToPage(prevPage)}
        disabled={page === 1 || isPending}
        className={baseBtn}
      >
        {'‹'}
      </button>

      {pageButtons}

      <button
        onClick={() => goToPage(nextPage)}
        disabled={page === totalPages || isPending}
        className={baseBtn}
      >
        {'›'}
      </button>
    </div>
  );
}

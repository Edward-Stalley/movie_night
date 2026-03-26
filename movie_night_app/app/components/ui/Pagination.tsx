import { PaginationProps } from '@/lib/types/ui';
import { buildPageHref } from '@/lib/utils/pagination';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Pagination({ page, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const pageButtons = pages.map((p) => (
    <Link
      href={buildPageHref(searchParams, { page: String(p) })}
      key={p}
      className={`join-item btn ${p === page && 'btn-active btn-primary'}`}
    >
      {p}
    </Link>
  ));

  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  return (
    <div className="flex items-center p-0 w-fit rounded-2xl">
      <Link
        href={buildPageHref(searchParams, { page: String(prevPage) })}
        className={`btn ${page === 1 && 'btn-disabled'}`}
        aria-disabled={page === 1}
      >
        {'<'}
      </Link>
      <div className="join">{pageButtons}</div>
      <Link
        href={buildPageHref(searchParams, { page: String(nextPage) })}
        className={`btn ${page === totalPages && 'btn-disabled'}`}
        aria-disabled={page === totalPages}
      >
        {'>'}
      </Link>
    </div>
  );
}

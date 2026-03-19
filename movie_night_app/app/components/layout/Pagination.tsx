import { PaginationProps } from '@/lib/types/ui';
import { buildPageHref } from '@/lib/utils/pagination';
import Link from 'next/link';

export default function Pagination({ page, totalPages, sort, order }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pageButtons = pages.map((p, i) => (
    <Link
      href={buildPageHref(p, sort, order)}
      key={p}
      className={`join-item btn ${p === page && 'btn-active'}`}
    >
      {p}
    </Link>
  ));

  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  return (
    <div className="flex items-center p-0 w-fit rounded-2xl">
      <Link
        href={buildPageHref(prevPage, sort, order)}
        className={`btn ${page === 1 && 'btn-disabled'}`}
        aria-disabled={page === 1}
      >
        {'<'}
      </Link>
      <div className="join">{pageButtons}</div>
      <Link
        href={buildPageHref(nextPage, sort, order)}
        className={`btn ${page === totalPages && 'btn-disabled'}`}
        aria-disabled={page === totalPages}
      >
        {'>'}
      </Link>
    </div>
  );
}

import { PaginationProps } from '@/lib/types/ui';
import Link from 'next/link';

export default function Pagination({ page, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const pageButtons = pages.map((p, i) => (
    <Link href={`?page=${p}`} key={p} className={`join-item btn ${p === page && 'btn-active'}`}>
      {p}
    </Link>
  ));

  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  return (
    <div className="flex items-center p-0 w-fit rounded-2xl">
      <Link
        href={`?page=${prevPage}`}
        className={`btn ${page === 1 && 'btn-disabled'}`}
        aria-disabled={page === 1}
      >
        {'<'}
      </Link>
      <div className="join">{pageButtons}</div>
      <Link
        href={`?page=${nextPage}`}
        className={`btn ${page === totalPages && 'btn-disabled'}`}
        aria-disabled={page === totalPages}
      >
        {'>'}
      </Link>
    </div>
  );
}

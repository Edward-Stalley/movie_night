import { PaginationProps } from '@/lib/types/ui';

export default function Pagination({ page, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const pageButtons = pages.map((p, i) => (
    <a href={`?page=${p}`} key={p} className="join-item btn">
      {p}
    </a>
  ));

  return (
    <div>
      <div className="join">{pageButtons}</div>
    </div>
  );
}

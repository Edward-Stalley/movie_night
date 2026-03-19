'use client';

import { buildSortParams } from '@/lib/config/sorts';
import { SortOption, SortOrder } from '@/lib/types/pagination';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type SortProps = {
  options: SortOption[];
  value: SortOption['value'];
  order: SortOrder;
};

export function Sort({ options, value, order }: SortProps) {
  const searchParams = useSearchParams();

  const sortOptions = options;

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle flex w-fit">
        Sort ▼
      </div>

      <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {sortOptions.map((opt) => {
          const params = buildSortParams(searchParams, value, order, opt.value);
          return (
            <li key={opt.value} className="">
              <Link
                className={`px-4 py-2 hover:bg-gray-200 text-left cursor ${
                  opt.value === value ? 'font-bold text-accent ' : ''
                }`}
                href={`?${params}`}
              >
                {opt.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

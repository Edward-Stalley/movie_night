'use client';

import { buildSortParams } from '@/lib/utils/urls/sortParams';
import { SortOption, SortOrder } from '@/lib/types/sort';
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
    <div className="dropdown dropdown-end bg-neutral h-6 rounded-2xl items-center justify-center flex p-2">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle flex w-fit">
        Sort ▼
      </div>

      <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow z-50 mt-3 w-32 p-2 sm:w-44">
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

'use client';

import { SortOption, SortOrder, SortValue } from '@/lib/types/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

type SortProps = {
  options: readonly SortOption[];
  value: SortValue;
  order: SortOrder;
};

export function Sort({ options, value, order }: SortProps) {
  console.log(options, value, order);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // If clicking the same sort, toggle order; otherwise default to desc
    const newOrder = sortValue === value ? (order === 'asc' ? 'desc' : 'asc') : 'desc';

    params.set('sort', sortValue);
    params.set('order', newOrder);
    params.set('page', '1'); // reset page on sort change

    router.push(`?${params.toString()}`);
  };

  const sortOptions = options;

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle flex w-fit">
        Sort ▼
      </div>

      <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {sortOptions.map((opt) => (
          <li key={opt.value} className="">
            <button
              className={`px-4 py-2 hover:bg-gray-200 text-left cursor ${
                opt.value === value ? 'font-bold text-accent ' : ''
              }`}
              onClick={() => handleSort(opt.value)}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

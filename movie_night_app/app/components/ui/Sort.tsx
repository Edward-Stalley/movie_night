'use client';

import { buildSortParams } from '@/lib/utils/urls/sortParams';
import { SortOption, SortOrder } from '@/lib/types/sort';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

type SortProps = {
  options: SortOption[];
  value: SortOption['value'];
  order: SortOrder;
};

export function Sort({ options, value, order }: SortProps) {
  const searchParams = useSearchParams();

  const [pendingParams, setPendingParams] = useState<string | null>(null);
  const currentParams = searchParams.toString();
  const isPending = pendingParams !== null && pendingParams !== currentParams;

  const sortOptions = options;
  return (
    <div className="dropdown dropdown-end bg-base-100 dropdown- h-6 rounded-sm items-center justify-center flex mr-2 relative">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost  min-h-0 h-6 flex items-center gap-2"
      >
        <span className="">Sort</span>
        <span className=" flex justify-center">
          <ChevronDownIcon className="h-5 w-5" />
        </span>
      </div>

      <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow z-50 mt-3 w-44 p-2 sm:w-44">
        {isPending && (
          <div className="loading loading-spinner absolute bottom-2 right-5 h-2 w-2 "/>
        )}

        {sortOptions.map((opt) => {
          const params = buildSortParams(searchParams, value, order, opt.value);
          return (
            <li key={opt.value} className="h-8">
              <Link
                onClick={() => setPendingParams(params)}
                className={`flex items-center justify-between w-full cursor ${
                  opt.value === value ? 'font-bold text-primary ' : ''
                }`}
                href={`?${params}`}
              >
                <p className="text-xs">{opt.label}</p>
                {opt.value === value && order === 'asc' && (
                  <ChevronDownIcon className="h-5 w-5 text-right" />
                )}
                {opt.value === value && order === 'desc' && (
                  <ChevronUpIcon className="h-5 w-5 text-right" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

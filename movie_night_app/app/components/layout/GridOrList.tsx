import { GridOrListProps } from '@/lib/types/ui';
import Toolbar from '@/app/components/layout/Toolbar';

export function GridOrList({
  children,
  layout,
  setLayout,
  headerTitle,
  pagination,
  sortValue,
  sortOrder,
  sortOptions,
}: GridOrListProps) {
  return (
    <div>
      {pagination && (
        <Toolbar
          layout={layout}
          setLayout={setLayout}
          pagination={pagination}
          sortOptions={sortOptions}
          sortValue={sortValue}
          sortOrder={sortOrder}
        />
      )}
      {layout === 'list' && (
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className=" text-base-content text-4xl font-bold p-4 pb-2 opacity-40 tracking-wide">
            {headerTitle}
          </li>
          {children}
        </ul>
      )}
      {layout === 'grid' && (
        <ul className="bg-base-100 pt-2 pl-5 pr-5 grid gap-2 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {children}
        </ul>
      )}
    </div>
  );
}

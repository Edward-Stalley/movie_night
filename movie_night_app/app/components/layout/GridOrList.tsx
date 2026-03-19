import { GridOrListProps } from '@/lib/types/ui';
import LayoutToggle from '@/app/components/ui/LayoutToggle';
import Pagination from './Pagination';
import { Sort } from './Sort';
import { SORT_OPTIONS_WATCHED_MOVIES } from '@/lib/config/sorts';

export function GridOrList({
  children,
  layout,
  setLayout,
  headerTitle,
  pagination,
}: GridOrListProps) {
  return (
    <div>
      <div className="bg-base-200 p-2">
        <div className="navbar gap-2">
          <LayoutToggle layout={layout} onChange={setLayout} />
          <Pagination page={pagination.page} totalPages={pagination.totalPages} />
          <Sort options={SORT_OPTIONS_WATCHED_MOVIES} value="rating" order="desc" />
        </div>
      </div>

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

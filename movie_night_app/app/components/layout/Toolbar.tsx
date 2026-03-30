import { ToolbarProps } from '@/lib/types/ui';
import LayoutToggle from '@/app/components/ui/LayoutToggle';
import Pagination from '@/app/components/ui/Pagination';
import { Sort } from '@/app/components/ui/Sort';

export default function Toolbar({
  layout,
  setLayout,
  pagination,
  sortOptions,
  sortValue,
  sortOrder,
  canToggleLayout = true,
}: ToolbarProps) {
  return (
    <div className="bg-base-200 p-2">
      <div className="navbar gap-2">
        {canToggleLayout && <LayoutToggle layout={layout} onChange={setLayout} />}
        {pagination && <Pagination page={pagination.page} totalPages={pagination.totalPages} />}
        <Sort options={sortOptions} value={sortValue} order={sortOrder} />
      </div>
    </div>
  );
}

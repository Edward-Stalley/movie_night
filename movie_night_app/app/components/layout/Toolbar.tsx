import { ToolbarProps } from '@/lib/types/ui';
import LayoutToggle from '@/app/components/ui/LayoutToggle';
import Pagination from '@/app/components/ui/Pagination';
import { Sort } from '@/app/components/ui/Sort';
import EditModeToggle from '../ui/EditModeToggle';

export default function Toolbar({
  layout,
  setLayout,
  pagination,
  sortOptions,
  sortValue,
  sortOrder,
  canToggleLayout = true,
  editMode,
  setEditMode,
}: ToolbarProps) {
  return (
    <div className="bg-base-200 p-2">
      <div className="navbar flex flex-wrap gap-4 md:flex-nowrap md:justify-between">
        {/* LEFT GROUP */}
        <div className="flex gap-2 items-center">
          {canToggleLayout && <LayoutToggle layout={layout} onChange={setLayout} />}
          <EditModeToggle editMode={editMode} setEditMode={setEditMode} />
        </div>

        {/* RIGHT GROUP */}
        <div className="flex gap-2 items-center ml-auto">
          <Sort options={sortOptions} value={sortValue} order={sortOrder} />
        </div>

        {/* FULL WIDTH ROW (mobile only) */}
        {pagination && (
          <div className="w-full md:w-auto flex sm:justify-center md:justify-start">
            <Pagination page={pagination.page} totalPages={pagination.totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}

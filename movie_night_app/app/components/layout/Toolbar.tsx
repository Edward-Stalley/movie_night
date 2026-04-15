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
  displayEditToggle,
}: ToolbarProps) {
  return (
    <div className=" p-2 flex flex-col gap-4 bg-base-200 ">
      <div className="flex flex-wrap gap-1 md:flex-nowrap md:justify-between items-center">
        {/* LEFT GROUP */}
        <div className="flex sm:gap-2 gap-1 ml-2">
          {canToggleLayout && <LayoutToggle layout={layout} onChange={setLayout} />}
          {displayEditToggle && layout === 'grid' && (
            <EditModeToggle editMode={editMode} setEditMode={setEditMode} />
          )}
        </div>

        {/* RIGHT GROUP */}
        <div className="flex gap-2 items-center ml-auto">
          <Sort options={sortOptions} value={sortValue} order={sortOrder} />
        </div>
      </div>

      {/* FULL WIDTH ROW (mobile only) */}
      {pagination && (
        <div className="justify-center w-full md:w-auto flex">
          <Pagination page={pagination.page} totalPages={pagination.totalPages} />
        </div>
      )}
    </div>
  );
}

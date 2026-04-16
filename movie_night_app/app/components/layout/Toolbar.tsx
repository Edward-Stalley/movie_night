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
        <div className="flex sm:gap-2 gap-1 ml-2 h-5">
          {canToggleLayout && <LayoutToggle layout={layout} onChange={setLayout} />}
          {displayEditToggle  && (
            <EditModeToggle editMode={editMode} setEditMode={setEditMode} />
          )}
        </div>

        {/* RIGHT GROUP */}
      </div>
      {/* FULL WIDTH ROW (mobile only) */}
      <div className="flex items-center w-full">
        <div className="flex-1" />
        {pagination && (
          <div className="justify-center flex">
            <Pagination page={pagination.page} totalPages={pagination.totalPages} />
          </div>
        )}
        <div className="flex flex-1 justify-end">
          <Sort options={sortOptions} value={sortValue} order={sortOrder} />
        </div>
      </div>
    </div>
  );
}

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
  canToggleLayout,
  editMode,
  setEditMode,
  displayEditToggle,
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
          canToggleLayout={canToggleLayout}
          editMode={editMode}
          setEditMode={setEditMode}
          displayEditToggle={displayEditToggle}
        />
      )}
      {layout === 'list' && (
        <ul className="list bg-base-200 rounded-none shadow-md">
          <li className=" text-base-content text-2xl md:text-3xl font-bold pb-2 opacity-40 tracking-wide">
            {headerTitle}
          </li>
          {children}
        </ul>
      )}
      {layout === 'grid' && (
        <ul className="bg-base-200 px-3 py-2 sm:p-4 md:p-5 grid gap-2 sm:gap-3 md:gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
          {children}
        </ul>
      )}
    </div>
  );
}

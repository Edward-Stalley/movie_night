'use client';

// import { EyeIcon } from '@heroicons/react/24/outline';
import { EyeIcon, PencilIcon } from '@heroicons/react/20/solid';

type Props = {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

export default function EditModeToggle({ editMode, setEditMode }: Props) {
  return (
    <fieldset
      className={`${editMode && 'bg-secondary'}bg-base-100 border-base-300 rounded-box w-fit border  flex items-center`}
    >
      <label className="label ">
        <input
          type="checkbox"
          defaultChecked
          className={`toggle toggle-sm ${editMode && 'border-secondary'}`}
          onClick={() => setEditMode(editMode === true ? false : true)}
        />
        <p className={`${editMode && 'text-secondary'} text-sm`}>
          {editMode ? (
            <PencilIcon className="w-6 h-6 text-secondary" />
          ) : (
            <EyeIcon className="w-6 h-6 text-primary" />
          )}
        </p>
      </label>
    </fieldset>
  );
}

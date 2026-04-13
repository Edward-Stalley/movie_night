'use client';

type Props = {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

export default function EditModeToggle({ editMode, setEditMode }: Props) {
  return (
    <fieldset
      className={`${editMode && 'bg-secondary'}fieldset bg-base-100 border-base-300 rounded-box w-fit p-2  border h-10 flex items-center`}
    >
      <label className="label ">
        <input
          type="checkbox"
          defaultChecked
          className={`toggle ${editMode && 'border-secondary'}`}
          onClick={() => setEditMode(editMode === true ? false : true)}
        />
        <p className={`${editMode && 'text-secondary'} text-sm`}>{editMode ? 'Edit' : 'Display'}</p>
      </label>
    </fieldset>
  );
}

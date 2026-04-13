'use client';

type Props = {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

export default function EditModeToggle({ editMode, setEditMode }: Props) {
  return (
    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-fit p-2  border h-10 flex items-center ">
      <label className="label ">
        <input
          type="checkbox"
          defaultChecked
          className="toggle"
          onClick={() => setEditMode(editMode === true ? false : true)}
        />
        {editMode ? 'Edit Mode' : 'Display Mode'}
      </label>
    </fieldset>
  );
}

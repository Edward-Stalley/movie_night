'use client';

type Layout = 'list' | 'grid';

type Props = {
  layout: Layout;
  onChange: (layout: Layout) => void;
};

export default function LayoutToggle({ layout, onChange }: Props) {
  return (
    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-fit p-2  border h-10 flex items-center ">
      <label className="label ">
        <input
          type="checkbox"
          defaultChecked
          className="toggle"
          onClick={() => onChange(layout === 'list' ? 'grid' : 'list')}
        />
        List / Grid
      </label>
    </fieldset>
  );
}

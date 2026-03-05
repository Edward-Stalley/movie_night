"use client";

type Layout = "list" | "grid";

type Props = {
  layout: Layout;
  onChange: (layout: Layout) => void;
};

export default function LayoutToggle({ layout, onChange }: Props) {
  return (
    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
      {/* <legend className="fieldset-legend">List / Grid</legend> */}
      <label className="label">
        <input
          type="checkbox"
          defaultChecked
          className="toggle"
          onClick={() => onChange(layout === "list" ? "grid" : "list")}
        />
        List / Grid
      </label>
    </fieldset>
  );
}

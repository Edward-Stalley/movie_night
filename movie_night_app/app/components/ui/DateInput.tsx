'use client';

type DateInputProps = {
  date?: string;
  onChange: (value: string) => void;
  min?: string;
  className?: { input: string };
};

export default function DateInput({ date, onChange, min, className }: DateInputProps) {
  return (
    <div className="flex justify-center items-center">
      <div>
        <input
          type="date"
          value={date || min}
          onChange={(e) => onChange(e.target.value)}
          className={`input rounded-2xl h-6 cursor-pointer ${className?.input}`}
          min={min}
        />
      </div>
    </div>
  );
}

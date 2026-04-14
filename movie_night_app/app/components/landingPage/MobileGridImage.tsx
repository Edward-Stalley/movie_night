import Image from 'next/image';

type MobileGridImageProps = {
  src: string;
  colStart: string;
  rowStart: string;
  colSpan: string;
  rowSpan: string;
  rounding?: string;
  mobile?: boolean;
  desktop?: boolean;
};

export default function MobileGridImage({
  src,
  colStart,
  rowStart,
  colSpan,
  rowSpan,
  rounding,
}: MobileGridImageProps) {
  return (
    <div className={`${colStart} ${rowStart} ${colSpan} ${rowSpan} ${rounding}`}>
      <div
        className={`relative w-full h-full overflow-hidden ${rounding ? rounding : 'rounded-2xl'}`}
      >
        <Image src={src} alt="" fill className="object-cover" priority />
      </div>
    </div>
  );
}

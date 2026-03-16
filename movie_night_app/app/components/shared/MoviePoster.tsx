import Link from 'next/link';
import Image from 'next/image';
import { MoviePoster as MoviePosterTypes } from '@/lib/types/ui';

export function MoviePoster({ id, posterPath, originalTitle, urlRoute }: MoviePosterTypes) {
  const image = (
    <Image
      className="rounded-2xl"
      src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
      width={210}
      height={315}
      priority
      alt={`${originalTitle} (${id})`}
      loading="eager"
    />
  );

  if (urlRoute) {
    return <Link href={`/${urlRoute}/${id}`}>{image}</Link>;
  }
  return image;
}

import Link from 'next/link';
import Image from 'next/image';
import { MoviePoster as MoviePosterTypes } from '@/lib/types/ui';

export function MoviePoster({
  id,
  posterPath,
  title,
  urlRoute,
  className,
  priority,
}: MoviePosterTypes) {
  const image = (
    <Image
      className={`block w-full h-auto ${className}`}
      src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
      width={210}
      height={315}
      priority={priority}
      alt={`${title} (${id})`}
      loading={priority ? 'eager' : 'lazy'}
    />
  );

  if (urlRoute) {
    return (
      <Link href={`/${urlRoute}/${id}`} prefetch={false}>
        {image}
      </Link>
    );
  }
  return image;
}

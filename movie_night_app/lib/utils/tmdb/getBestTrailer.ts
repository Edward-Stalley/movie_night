import { TMDBVideo } from '@/lib/types/tmdb';

export function getBestTrailer(videos: TMDBVideo[]): string | null {
  if (!videos?.length) return null;

  const trailer =
    videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube') ??
    videos.find((v) => v.type === 'Teaser' && v.site === 'YouTube') ??
    videos.find((v) => v.site === 'YouTube');

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}

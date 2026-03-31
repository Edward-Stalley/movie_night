export function getYouTubeId(url?: string | null): string | null {
  if (!url) return null;

  // youtube.com/watch?v=
  if (url.includes('watch?v=')) {
    return url.split('watch?v=')[1].split('&')[0];
  }

  // youtu.be/
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1].split('?')[0];
  }

  return null;
}

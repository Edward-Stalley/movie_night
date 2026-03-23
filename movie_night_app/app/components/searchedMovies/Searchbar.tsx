'use client';

type SearchbarProps = {
  movieTitle: string;
  setMovieTitle: (value: string) => void;
};

import { useRouter } from 'next/navigation';

export default function Searchbar({ movieTitle, setMovieTitle }: SearchbarProps) {
  const router = useRouter();

  const handleSearch = () => {
    if (!movieTitle.trim()) return;

    router.push(`/search-movie?query=${movieTitle}`);
  };
  return (
    <div className="flex flex-col items-center">
      <input
        placeholder="Type Film Name..."
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="input m-2"
      ></input>

      <button onClick={handleSearch} className="btn btn-soft btn-primary hover:btn-active">
        Search
      </button>
    </div>
  );
}

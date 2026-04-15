'use client';

type SearchbarProps = {
  movieTitle: string;
  setMovieTitle: (value: string) => void;
};

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function Searchbar({ movieTitle, setMovieTitle }: SearchbarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    if (!movieTitle.trim()) return;

    startTransition(() => {
      router.push(`/search-movie?query=${movieTitle}`);
    });
  };
  return (
    <div className="">
      <div className=" bg-base-100 flex items-center justify-center m-2">
        <input
          placeholder="Type Film Name..."
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="input m-2 input-primary text-base-content rounded-2xl"
        ></input>

        <button onClick={handleSearch} className="btn btn-primary hover:btn-active rounded-2xl w-20">
          {isPending ? <div className=" loading" /> : 'Search'}
        </button>
      </div>
    </div>
  );
}

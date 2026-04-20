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
    <div className=" bg-base-200 flex flex-col">
      <div className=" bg-base-200 flex items-center justify-center p-2">
        <input
          placeholder="Type Film Name..."
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="input m-2 text-base-content rounded-2xl"
        ></input>

        <button onClick={handleSearch} className="btn rounded-2xl w-18 btn-outline ">
          {isPending ? <div className=" loading" /> : <div className="text-md">Search</div>}
        </button>
      </div>
    </div>
  );
}

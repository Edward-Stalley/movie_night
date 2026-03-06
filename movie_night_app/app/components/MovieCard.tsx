"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { StoredMovie } from "@/lib/types/domain";

export default function MovieCard(movie: StoredMovie) {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`/api/movies/${movie.id}`, { method: "DELETE" });
    router.refresh();
  };

  const handleAdd = async () => {
    await fetch(`/api/movies/watched`, {
      method: "POST",
      body: JSON.stringify(movie),
    });
    router.refresh();
  };

  return (
    <li className="group relative transition-transform duration-300 ease-in-out hover:scale-103">
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
        alt={movie.originalTitle ?? "Movie"}
        width={200}
        height={315}
        className="rounded-2xl h-auto w-auto"
      />

      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 btn btn-secondary btn-soft absolute top-0 right-0  rounded-tr-2xl rounded-br-none rounded-tl-none h-6 w-4"
      >
        X
      </button>

      <button
        onClick={handleAdd}
        className="opacity-0 group-hover:opacity-100 btn btn-primary btn-soft  absolute bottom-0 rounded-tr-2xl rounded-bl-2xl rounded-br-none rounded-tl-none"
      >
        +
      </button>
    </li>
  );
}

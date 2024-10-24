"use client";

import { useEffect, useRef, useState } from "react";
import { Movie, MovieResponse } from "@/lib/tmdb";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface MovieGridProps {
  initialMovies: MovieResponse;
  fetchMore: (page: number) => Promise<MovieResponse>;
}

export function MovieGrid({ initialMovies, fetchMore }: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies.results);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(page < initialMovies.total_pages);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          try {
            const nextPage = page + 1;
            const newMovies = await fetchMore(nextPage);
            setMovies((prev) => [...prev, ...newMovies.results]);
            setPage(nextPage);
            setHasMore(nextPage < newMovies.total_pages);
          } catch (error) {
            console.error("Error loading more movies:", error);
          } finally {
            setLoading(false);
          }
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchMore, hasMore, loading, page]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div ref={observerTarget} className="flex justify-center py-8">
        {loading && (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading more movies...
          </Button>
        )}
      </div>
    </div>
  );
}
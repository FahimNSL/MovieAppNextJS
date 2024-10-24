import { MovieGrid } from "@/components/MovieGrid";
import { SearchBar } from "@/components/SearchBar";
import { tmdb } from "@/lib/tmdb";

export default async function Home() {
  const initialMovies = await tmdb.getPopularMovies(1);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 max-w-lg">
        <SearchBar />
      </div>
      <MovieGrid
        initialMovies={initialMovies}
        fetchMore={(page) => tmdb.getPopularMovies(page)}
      />
    </main>
  );
}
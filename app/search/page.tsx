import { MovieGrid } from "@/components/MovieGrid";
import { SearchBar } from "@/components/SearchBar";
import { tmdb } from "@/lib/tmdb";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;
  const initialMovies = await tmdb.searchMovies(query, 1);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 max-w-lg">
        <SearchBar />
      </div>
      <h1 className="mb-8 text-2xl font-bold">
        Search results for: {query}
      </h1>
      <MovieGrid
        initialMovies={initialMovies}
        fetchMore={(page) => tmdb.searchMovies(query, page)}
      />
    </main>
  );
}
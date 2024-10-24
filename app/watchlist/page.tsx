import { MovieGrid } from '@/components/MovieGrid';
import { getWatchlist } from '@/lib/actions';

export default async function WatchlistPage() {
  const watchlist = await getWatchlist();
  const watchlistResponse = {
    page: 1,
    results: watchlist,
    total_pages: 1,
    total_results: watchlist.length,
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Watchlist</h1>
      {watchlist.length > 0 ? (
        <MovieGrid
          initialMovies={watchlistResponse}
          fetchMore={() => Promise.resolve(watchlistResponse)}
        />
      ) : (
        <div className="text-center text-muted-foreground">
          <p>Your watchlist is empty.</p>
          <p>Start adding movies you want to watch later!</p>
        </div>
      )}
    </main>
  );
}
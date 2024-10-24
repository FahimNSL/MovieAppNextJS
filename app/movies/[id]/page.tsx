import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Clock, Calendar } from "lucide-react";
import { tmdb } from "@/lib/tmdb";
import { CastList } from "@/components/CastList";
import { MovieGrid } from "@/components/MovieGrid";
import { WatchlistButton } from "@/components/WatchlistButton";
import { isInWatchlist } from "@/lib/actions";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const movieId = parseInt(params.id);
    const [movie, credits, recommendations, inWatchlist] = await Promise.all([
      tmdb.getMovieDetails(movieId),
      tmdb.getMovieCredits(movieId),
      tmdb.getMovieRecommendations(movieId),
      isInWatchlist(movieId),
    ]);

    const backdropUrl = tmdb.getImageUrl(movie.backdrop_path);
    const posterUrl = tmdb.getImageUrl(movie.poster_path, "w500");

    return (
      <main>
        <div className="relative h-[60vh] min-h-[400px] w-full">
          {backdropUrl && (
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              className="object-cover brightness-50"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
          <div className="container relative flex h-full items-end px-4 py-12">
            <div className="flex flex-col gap-8 md:flex-row">
              {posterUrl && (
                <div className="shrink-0">
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="rounded-lg shadow-xl"
                    priority
                  />
                </div>
              )}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white md:text-5xl">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-xl text-white/80">{movie.tagline}</p>
                )}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(movie.release_date), "MMMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="h-4 w-4" />
                    {movie.runtime} minutes
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-primary/20 px-3 py-1 text-sm text-white"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <p className="max-w-prose text-lg text-white/90">
                  {movie.overview}
                </p>
                <WatchlistButton movie={movie} initialIsInWatchlist={inWatchlist} />
              </div>
            </div>
          </div>
        </div>

        <section className="container px-4 py-12">
          <h2 className="mb-6 text-2xl font-bold">Cast</h2>
          <Suspense fallback={<div>Loading cast...</div>}>
            <CastList cast={credits.cast} />
          </Suspense>
        </section>

        {recommendations.results.length > 0 && (
          <section className="container px-4 py-12">
            <h2 className="mb-6 text-2xl font-bold">You might also like</h2>
            <Suspense fallback={<div>Loading recommendations...</div>}>
              <MovieGrid
                initialMovies={recommendations}
                fetchMore={() => Promise.resolve(recommendations)}
              />
            </Suspense>
          </section>
        )}
      </main>
    );
  } catch (error) {
    notFound();
  }
}
import { z } from "zod";
import {
  movieSchema,
  movieDetailsSchema,
  movieResponseSchema,
  creditsResponseSchema,
} from "./schemas";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export type Movie = z.infer<typeof movieSchema>;
export type MovieDetails = z.infer<typeof movieDetailsSchema>;
export type MovieResponse = z.infer<typeof movieResponseSchema>;
export type Cast = z.infer<typeof creditsResponseSchema>["cast"][number];

export const tmdb = {
  getImageUrl: (path: string | null, size: string = "original") => {
    if (!path) return null;
    return `${TMDB_IMAGE_BASE}/${size}${path}`;
  },

  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return movieResponseSchema.parse(data);
  },

  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    const res = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return movieResponseSchema.parse(data);
  },

  async getMovieDetails(id: number): Promise<MovieDetails> {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return movieDetailsSchema.parse(data);
  },

  async getMovieCredits(id: number): Promise<{ cast: Cast[] }> {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return creditsResponseSchema.parse(data);
  },

  async getMovieRecommendations(id: number): Promise<MovieResponse> {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return movieResponseSchema.parse(data);
  },
};
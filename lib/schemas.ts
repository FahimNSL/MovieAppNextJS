import { z } from "zod";

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
  genre_ids: z.array(z.number()),
});

export const movieDetailsSchema = movieSchema.extend({
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  runtime: z.number(),
  status: z.string(),
  tagline: z.string().nullable(),
});

export const castSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
});

export const movieResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const creditsResponseSchema = z.object({
  cast: z.array(castSchema),
});
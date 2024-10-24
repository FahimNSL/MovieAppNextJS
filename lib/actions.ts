'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';
import { movieSchema } from './schemas';

const watchlistSchema = z.array(movieSchema);

export async function getWatchlist() {
  const watchlistCookie = cookies().get('watchlist');
  if (!watchlistCookie) return [];
  
  try {
    return watchlistSchema.parse(JSON.parse(watchlistCookie.value));
  } catch {
    return [];
  }
}

export async function toggleWatchlist(movie: z.infer<typeof movieSchema>) {
  const watchlist = await getWatchlist();
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);
  
  const newWatchlist = isInWatchlist
    ? watchlist.filter((m) => m.id !== movie.id)
    : [...watchlist, movie];
  
  cookies().set('watchlist', JSON.stringify(newWatchlist), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  
  return { isInWatchlist: !isInWatchlist };
}

export async function isInWatchlist(movieId: number) {
  const watchlist = await getWatchlist();
  return watchlist.some((m) => m.id === movieId);
}
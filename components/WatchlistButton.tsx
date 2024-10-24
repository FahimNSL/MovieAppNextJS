'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { toggleWatchlist } from '@/lib/actions';
import { type Movie } from '@/lib/tmdb';

interface WatchlistButtonProps {
  movie: Movie;
  initialIsInWatchlist: boolean;
}

export function WatchlistButton({ movie, initialIsInWatchlist }: WatchlistButtonProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(initialIsInWatchlist);
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);
    try {
      const result = await toggleWatchlist(movie);
      setIsInWatchlist(result.isInWatchlist);
      toast.success(
        result.isInWatchlist
          ? 'Added to watchlist'
          : 'Removed from watchlist'
      );
    } catch (error) {
      toast.error('Failed to update watchlist');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant={isInWatchlist ? 'secondary' : 'outline'}
      size="sm"
      className="gap-2"
      disabled={isPending}
      onClick={handleClick}
    >
      <Heart
        className={isInWatchlist ? 'fill-primary' : ''}
        size={16}
      />
      {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
    </Button>
  );
}
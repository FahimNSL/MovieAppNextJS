"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/tmdb";
import { tmdb } from "@/lib/tmdb";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function MovieCard({ movie }: { movie: Movie }) {
  const posterUrl = tmdb.getImageUrl(movie.poster_path, "w500");

  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="group h-full overflow-hidden transition-transform hover:scale-105">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] w-full">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted">
                No Image
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <h3 className="mb-1 font-semibold">{movie.title}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
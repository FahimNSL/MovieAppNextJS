import Image from "next/image";
import { Cast } from "@/lib/tmdb";
import { tmdb } from "@/lib/tmdb";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function CastList({ cast }: { cast: Cast[] }) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {cast.map((member) => (
          <Card key={member.id} className="w-[150px]">
            <CardContent className="p-0">
              <div className="relative aspect-[2/3] w-full">
                {tmdb.getImageUrl(member.profile_path, "w185") ? (
                  <Image
                    src={tmdb.getImageUrl(member.profile_path, "w185")!}
                    alt={member.name}
                    fill
                    className="rounded-t-lg object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-2">
                <h4 className="font-semibold leading-tight">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.character}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
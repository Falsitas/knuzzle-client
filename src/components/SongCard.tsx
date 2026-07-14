import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Song } from "@/types/song";

interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {song.title}
        </CardTitle>

        <CardDescription>
          {song.artist}
        </CardDescription>
        <CardDescription>
          <a
            href={song.referenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-50 text-blue-500 rounded-md px-3 py-1"
          >
            레퍼런스 링크
          </a>
        </CardDescription>
      </CardHeader>


      <CardContent className="space-y-2">

        <div className="rounded-lg border p-3 space-y-2">
          <div className="font-semibold text-sm">
            필요 세션
          </div>

          <div className="w-fit rounded-md bg-muted px-3 py-1 text-sm">
            보컬
            {" "}
            {song.vocal
              ? song.vocal.nickname
              : "없음"}
          </div>

          <div className="flex flex-wrap gap-2">
            {song.requiredParts.length === 0 ? (
              <span className="text-sm text-muted-foreground">
                없음
              </span>
            ) : (
              song.requiredParts.map((part) => (
                <div
                  key={part.session}
                  className="rounded-md bg-muted px-3 py-1 text-sm"
                >
                  {part.session} {part.count}명
                </div>
              ))
            )}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
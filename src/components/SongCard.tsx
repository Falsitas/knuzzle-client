import {
  Card,
  CardContent,
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
        <CardTitle>{song.title}</CardTitle>
      </CardHeader>

      <CardContent>
        {song.artist}
      </CardContent>

      <CardContent>
        <a href={song.referenceUrl} target="_blank">레퍼런스 링크</a>
      </CardContent>
    </Card>
  );
}
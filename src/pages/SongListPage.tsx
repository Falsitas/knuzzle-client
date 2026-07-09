import { useQuery } from "@tanstack/react-query";

import { getSongs } from "@/api/songs";
import SongCard from "@/components/SongCard";
import LogoutButton from "@/components/LogoutButton";

import type { Song } from "@/types/song";

export default function SongListPage() {
  const {
    data: songs,
    isPending,
    error,
  } = useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <main className="min-h-screen bg-background">
      <LogoutButton />
      <div className="mx-auto max-w-md p-4 space-y-4">
        <h1 className="text-2xl font-bold">
          선곡 후보
        </h1>

        {songs?.length === 0 ? (
          <p className="text-muted-foreground">
            등록된 곡이 없습니다.
          </p>
        ) : (
          songs?.map((song) => (
            <SongCard
              key={song.id}
              song={song}
            />
          ))
        )}
      </div>
    </main>
  );
}
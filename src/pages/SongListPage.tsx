import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getSongs } from "@/api/songs";
import SongCard from "@/components/SongCard";

import type { Song } from "@/types/song";
import AddSongFab from "@/components/AddSongFAB";
// import { useAuthStore } from "@/store/authStore";

export default function SongListPage() {
  const navigate = useNavigate();
  const {
    data: songs,
    isPending,
    error,
  } = useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: getSongs,
  });
  
  // const user = useAuthStore(
  //   (state) => state.user
  // );

  // console.log(user);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-md p-4 space-y-4">

        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            선곡 후보
          </h1>

          <Button
            variant="outline"
            onClick={() => navigate("/mypage")}
          >
            내 정보
          </Button>
        </header>
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

        <AddSongFab />

      </div>
    </main>
  );
}
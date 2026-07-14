import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getSongs } from "@/api/songs";
import SongCard from "@/components/SongCard";

import type { Song } from "@/types/song";
import AddSongFab from "@/components/AddSongFAB";
import type { User } from "@/types/user";
import { getVocals } from "@/api/users";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
// import { useAuthStore } from "@/store/authStore";

export default function SongListPage() {
  const navigate = useNavigate();
  const [selectedVocalId, setSelectedVocalId] = useState<number | null>(null);
  const {
    data: songs,
    isPending,
    error,
  } = useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: getSongs,
  });
  const {
    data: vocals,
    isPending: isVocalsPending,
  } = useQuery<User[]>({
    queryKey: ["vocals"],
    queryFn: getVocals,
  });

  const filteredSongs = selectedVocalId
    ? songs?.filter(
        (song) =>
          song.vocal?.id === selectedVocalId
      )
    : songs;
  
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

          <Select
            value={
              selectedVocalId
                ? String(selectedVocalId)
                : "all"
            }
            onValueChange={(value) =>
              setSelectedVocalId(
                value === "all"
                  ? null
                  : Number(value)
              )
            }
          >
            <SelectTrigger>
              {
                selectedVocalId
                  ? vocals?.find(
                      (vocal) => vocal.id === selectedVocalId
                    )?.nickname
                  : "보컬선택"
              }
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                전체
              </SelectItem>

              {isVocalsPending ? (
                <SelectItem disabled value="loading">
                  불러오는 중...
                </SelectItem>
              ) : (
                vocals?.map((vocal) => (
                  <SelectItem
                    key={vocal.id}
                    value={String(vocal.id)}
                  >
                    {vocal.nickname}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => navigate("/mypage")}
          >
            내 정보
          </Button>
        </header>
        {filteredSongs?.length === 0 ? (
          <p className="text-muted-foreground">
            등록된 곡이 없습니다.
          </p>
        ) : (
          filteredSongs?.map((song) => (
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
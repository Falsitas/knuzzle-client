import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import SongForm from "@/components/SongForm";

import { getSong, updateSong } from "@/api/songs";

import type { SongPayload } from "@/types/song";

export default function EditSongPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: song, isPending } = useQuery({
    queryKey: ["song", id],
    queryFn: () => getSong(Number(id)),
    enabled: !!id,
  });

  const handleSubmit = async (
    payload: SongPayload
  ) => {
    await updateSong(Number(id), payload);

    await queryClient.invalidateQueries({
      queryKey: ["songs"],
    });

    navigate("/");
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!song) {
    return <div>곡을 찾을 수 없습니다.</div>;
  }

  return (
    <SongForm
      initialValue={{
        title: song.title,
        artist: song.artist,
        referenceUrl: song.referenceUrl ?? "",
        vocalId: song.vocal!.id,
        requiredParts: song.requiredParts.map((part) => ({
          session: part.session,
          count: part.count,
        })),
      }}
      submitText="수정"
      onSubmit={handleSubmit}
    />
  );
}
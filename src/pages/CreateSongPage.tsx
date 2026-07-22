import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import SongForm from "@/components/SongForm";

import { createSong } from "@/api/songs";
import type { SongPayload } from "@/types/song";

export default function CreateSongPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (payload: SongPayload) => {
    await createSong(payload);

    await queryClient.invalidateQueries({
      queryKey: ["songs"],
    });

    navigate("/");
  };

  return (
    <SongForm
      initialValue={{
        title: "",
        artist: "",
        referenceUrl: "",
        vocalId: undefined,
        requiredParts: [],
      }}
      submitText="등록"
      onSubmit={handleSubmit}
    />
  );
}
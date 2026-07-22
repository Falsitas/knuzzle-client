import { api } from "@/lib/api";
import type { Song, SongPayload } from "@/types/song";

export async function getSongs() {
  const response = await api.get("/songs");
  return response.data;
}

export async function createSong(payload: SongPayload) {
  const { data } = await api.post("/songs", payload);
  return data;
}

export const getSong = async (id: number): Promise<Song> => {
  const { data } = await api.get(`/songs/${id}`);
  return data;
};

export const updateSong = async (
  id: number,
  payload: SongPayload,
): Promise<Song> => {
  const { data } = await api.patch(`/songs/${id}`, payload);
  return data;
};

export async function deleteSong(id: number) {
  await api.delete(`/songs/${id}`);
}

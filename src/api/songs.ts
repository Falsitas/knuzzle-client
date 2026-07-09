import { api } from "@/lib/api";

export async function getSongs() {
  const response = await api.get("/songs");
  return response.data;
}

export async function createSong(payload: {
  title: string;
  artist: string;
}) {
  const { data } = await api.post("/songs", payload);
  return data;
}
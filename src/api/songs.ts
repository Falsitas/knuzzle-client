import { api } from "@/lib/api";
import type { Session } from "@/types/session";

export async function getSongs() {
  const response = await api.get("/songs");
  return response.data;
}

export async function createSong(payload: {
  title: string;
  artist: string;
  referenceUrl: string;
  vocalId?: number;
  requiredParts: {
    session: Session;
    count: number;
  }[];
}) {
  const { data } = await api.post("/songs", payload);
  return data;
}
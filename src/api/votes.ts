import { api } from "@/lib/api";

export async function upsertVote(payload: {
  songId: number;
  rating: number;
  sessionDetail?: string;
}) {
  const { data } = await api.post("/votes", payload);
  return data;
}
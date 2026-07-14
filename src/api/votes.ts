import { api } from "@/lib/api";
import type { VoteType } from "@/types/votetype";

export async function upsertVote(payload: {
  songId: number;
  voteType: VoteType;
  sessionDetail?: string;
}) {
  const { data } = await api.post("/votes", payload);
  return data;
}
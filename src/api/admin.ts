import { api } from "@/lib/api";
import type { VoteTable } from "@/types/vote";

export async function getVoteTable() {
  const { data } = await api.get<VoteTable>("/admin/votes/table");
  return data;
}
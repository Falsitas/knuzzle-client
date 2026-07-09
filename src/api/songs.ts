import { api } from "@/lib/api";

export async function getSongs() {
  const response = await api.get("/songs");
  return response.data;
}
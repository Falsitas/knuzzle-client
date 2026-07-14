import { api } from "@/lib/api";
import type { Session } from "@/types/session";

export async function updatePrimarySession(
  session: Session,
) {
  const { data } = await api.patch(
    "/users/me/session",
    {
      session,
    },
  );

  return data;
}

export async function getMe() {
  const { data } = await api.get("/users/me");

  return data;
}

export async function getVocals() {
  const { data } = await api.get("users/?primarySession=VOCAL")

  return data;
}
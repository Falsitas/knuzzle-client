import { api } from "@/lib/api";

export type Session =
  | "VOCAL"
  | "GUITAR"
  | "KEYBOARD"
  | "BASS"
  | "DRUM";

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
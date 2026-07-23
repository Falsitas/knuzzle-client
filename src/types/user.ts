import type { Session } from "./session";

export type Role =
  | "MEMBER"
  | "ADMIN"

export interface User {
  id: number;
  nickname: string;
  primarySession: Session | null;
  role: Role;
}
import type { Session } from "./session";

export interface User {
  id: number;
  nickname: string;
  primarySession: Session | null;
}
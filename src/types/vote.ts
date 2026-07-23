import type { Session } from "./session";

export interface VoteTableUser {
  id: number;
  nickname: string;
  primarySession: Session | null;
}

export interface RequiredPart {
  session: Session;
  count: number;
}

export interface VoteInfo {
  rating: number;
  sessionDetail: string | null;
}

export interface VoteTableSong {
  id: number;
  title: string;
  vocalNickname: string;
  requiredParts: RequiredPart[];
  votes: Record<number, VoteInfo>;
}

export interface VoteTable {
  users: VoteTableUser[];
  songs: VoteTableSong[];
}
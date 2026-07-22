import type { Session } from "@/types/session";

export interface Song {
  id: number;
  title: string;
  artist: string;
  referenceUrl: string;
  createdAt: string;

  createdBy: {
    id: number;
    nickname: string;
  };

  vocal: {
    id: number;
    nickname: string;
  } | null;

  votes: {
    rating: number;
    session: Session;
    sessionDetail: string | null;
  }[];

  requiredParts: {
    session: Session;
    count: number;
  }[];
}

export interface SongPayload {
  title: string;
  artist: string;
  referenceUrl: string;
  vocalId?: number;
  requiredParts: {
    session: Session;
    count: number;
  }[];
}

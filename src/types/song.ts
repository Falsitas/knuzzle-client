import type { Session } from "@/types/session";
import type { VoteType } from "@/types/votetype";

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
    voteType: VoteType;
    session: Session;
    sessionDetail: string | null;
  }[];

  requiredParts: {
    session: Session;
    count: number;
  }[];
}
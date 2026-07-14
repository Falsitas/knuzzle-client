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
    user: {
      id: number;
      nickname: string;
    };
    voteType: string;
    session: string;
    sessionDetail: string | null;
  }[];

  requiredParts: {
    session: number;
    count: string;
  }[];
}
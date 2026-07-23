export interface VoteTableUser {
  id: number;
  nickname: string;
}

export interface VoteTableSong {
  id: number;
  title: string;
  votes: Record<number, number>;
}

export interface VoteTable {
  users: VoteTableUser[];
  songs: VoteTableSong[];
}
import { create } from "zustand";
import { getMe } from "@/api/users";
import type { Session } from "@/types/session";
import type { Song } from "@/types/song";
import type { VoteType } from "@/types/votetype";

interface Vote {
  id: number;
  song: Song;
  voteType: VoteType;
  session: Session;
  sessionDetail: string;
}

interface User {
  id: number;
  email?: string;
  nickname: string;
  role: string;
  primarySession?: Session | null;
  createdSongs: Song[];
  vocalSongs: Song[];
  votes: Vote[];
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) =>
    set({
      user,
    }),

  clearUser: () =>
    set({
      user: null,
    }),

  initialize: async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return;
    }
    
    try {
      const user = await getMe();
      set({
        user,
      });
    } catch(e) {
      console.log(e)
    }
  },
}));
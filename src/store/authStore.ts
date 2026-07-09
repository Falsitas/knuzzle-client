import { create } from "zustand";
import { getMe, type Session } from "@/api/users";

interface User {
  id: number;
  email?: string;
  nickname: string;
  role: string;
  primarySession?: Session | null;
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

    const user = await getMe();

    set({
      user,
    });
  },
}));
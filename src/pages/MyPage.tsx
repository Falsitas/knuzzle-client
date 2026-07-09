import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

import {
  updatePrimarySession,
  type Session,
} from "@/api/users";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import LogoutButton from "@/components/LogoutButton";

const sessions: Session[] = [
  "VOCAL",
  "GUITAR",
  "KEYBOARD",
  "BASS",
  "DRUM",
];

export default function MyPage() {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user,
  );

  const setUser = useAuthStore(
    (state) => state.setUser,
  );

  const [session, setSession] = useState<Session | "">(
    user?.primarySession ?? "",
  );

  const mutation = useMutation({
    mutationFn: updatePrimarySession,

    onSuccess: (updatedUser) => {
      setUser(updatedUser);
    },
  });

  if (!user) {
    return <div>로그인 정보가 없습니다.</div>;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-md p-4 space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
          >
            ←
          </Button>

          <h1 className="text-2xl font-bold">
            내 정보
          </h1>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            닉네임
          </p>
          <p>{user.nickname}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            주 세션
          </p>

          <Select
            value={session}
            onValueChange={(value) =>
              setSession(value as Session)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="세션 선택" />
            </SelectTrigger>

            <SelectContent>
              {sessions.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          disabled={
            !session ||
            mutation.isPending
          }
          onClick={() => {
            mutation.mutate(session as Session);
          }}
        >
          {mutation.isPending
            ? "저장 중..."
            : "저장"}
        </Button>

        <LogoutButton />
      </div>
    </main>
  );
}
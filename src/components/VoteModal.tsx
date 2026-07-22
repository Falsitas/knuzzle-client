import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertVote } from "@/api/votes";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import type { Session } from "@/types/session";
import { getMe } from "@/api/users";
import { Star } from "lucide-react";

type VoteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  songId: number;
  songTitle: string;

  requiredParts: {
    session: Session;
    count: number;
  }[];

  myVote?: {
    rating: number;
    session: Session;
    sessionDetail: string | null;
  };
};

export default function VoteModal({
  open,
  onOpenChange,
  songId,
  songTitle,
  requiredParts,
  myVote,
}: VoteModalProps) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [rating, setRating] = useState(myVote?.rating ?? 0);

  const [sessionDetail, setSessionDetail] = useState(
    myVote?.sessionDetail ?? ""
  );

  const myRequiredPart = requiredParts.find(
    (part) => part.session === user?.primarySession,
  );

  const needsSessionDetail =
    (user?.primarySession === "GUITAR" ||
      user?.primarySession === "KEYBOARD") &&
    (myRequiredPart?.count ?? 0) > 1;

  const voteMutation = useMutation({
    mutationFn: upsertVote,

    onSuccess: async () => {
      const updatedUser = await getMe();
      setUser(updatedUser);

      await queryClient.invalidateQueries({
        queryKey: ["songs"],
      });

      onOpenChange(false);
    },

    onError: (error) => {
      console.error(error);
    },
  });

  function handleVote(rating: number) {
    if(rating < 1 || rating > 5) {
      alert("선호도를 골라주세요");
      return;
    }
    voteMutation.mutate({
      songId,
      rating,
      sessionDetail,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>투표하기</DialogTitle>
          <DialogDescription>{songTitle}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <DialogDescription>
            내 세션: {user?.primarySession}
          </DialogDescription>

          {needsSessionDetail && (
            <Input
              placeholder="원하는 파트 (예: 리드 기타, Pad, Piano 등)"
              value={sessionDetail}
              onChange={(e) => setSessionDetail(e.target.value)}
            />
          )}

          <div className="flex items-center gap-1">
            <DialogDescription>
              하기싫다
            </DialogDescription>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  disabled={voteMutation.isPending}
                  className="disabled:opacity-50"
                >
                  <Star
                    className={`size-8 ${
                      rating >= value
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            
            <DialogDescription>
              하고싶다
            </DialogDescription>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={voteMutation.isPending}
            >
              취소
            </Button>

            <Button
              className="flex-1"
              onClick={() => handleVote(rating)}
              disabled={voteMutation.isPending || rating === 0}
            >
              확인
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
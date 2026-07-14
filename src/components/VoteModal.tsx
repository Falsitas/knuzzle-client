import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { upsertVote } from "@/api/votes";
import type { VoteType } from "@/types/votetype";

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
    voteType: VoteType;
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

  const [sessionDetail, setSessionDetail] = useState(
    myVote?.sessionDetail ?? "",
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

  function handleVote(voteType: VoteType) {
    voteMutation.mutate({
      songId,
      voteType,
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

          <div className="flex gap-2">
            <Button
              variant={myVote?.voteType === "LIKE" ? "default" : "outline"}
              className="flex-1"
              onClick={() => handleVote("LIKE")}
              disabled={voteMutation.isPending}
            >
              {myVote?.voteType === "LIKE" ? "✓ 하고싶다" : "하고싶다"}
            </Button>

            <Button
              variant={myVote?.voteType === "DISLIKE" ? "default" : "outline"}
              className="flex-1"
              onClick={() => handleVote("DISLIKE")}
              disabled={voteMutation.isPending}
            >
              {myVote?.voteType === "DISLIKE" ? "✓ 하기싫다" : "하기싫다"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
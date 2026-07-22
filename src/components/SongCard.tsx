import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Song } from "@/types/song";
import { useState } from "react";
import VoteModal from "./VoteModal";
import { useAuthStore } from "@/store/authStore";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Star } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteSong } from "@/api/songs";
import axios from "axios";

interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const myVote = song.votes[0];
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSong(song.id);

      await queryClient.invalidateQueries({
        queryKey: ["songs"],
      });
    } catch (e: unknown) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        alert(
          e.response?.data?.message ??
            "삭제에 실패했습니다."
        );
      } else {
        alert("삭제에 실패했습니다.");
      }
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <Card className="relative">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <CardTitle>{song.title}</CardTitle>

              <CardDescription>
                {song.artist}
              </CardDescription>
            </div>

            {user?.id === song.createdBy.id && (
              <div className="flex shrink-0 gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/songs/${song.id}/edit`)}
                >
                  <Pencil className="size-5" />
                </Button>
                <AlertDialog
                  open={open}
                  onOpenChange={setOpen}
                >
                  <AlertDialogTrigger
                    className="inline-flex w-10 items-center justify-center hover:bg-accent"
                  >
                      <Trash2 className="size-5 text-red-500" />
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        곡을 삭제하시겠습니까?
                      </AlertDialogTitle>

                      <AlertDialogDescription>
                        삭제한 곡은 복구할 수 없습니다.
                        <br />
                        투표가 있는 곡은 삭제할 수 없습니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel
                        variant="outline"
                        size="default"
                      >
                        취소
                      </AlertDialogCancel>

                      <AlertDialogAction
                        variant="destructive"
                        size="default"
                        disabled={isDeleting}
                        onClick={handleDelete}
                      >
                        {isDeleting ? "삭제 중..." : "삭제"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>

          <CardDescription>
            <a
              href={song.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-50 text-blue-500 rounded-md px-3 py-1"
            >
              레퍼런스 링크
            </a>
          </CardDescription>
        </CardHeader>


        <CardContent className="space-y-2">

          <div
            className="rounded-lg border p-3 space-y-2 cursor-pointer hover:bg-muted/30"
            onClick={() => setIsVoteModalOpen(true)}        
          >
            <div className="font-semibold text-sm">
              필요 세션
            </div>

            {myVote && (
              <div className="flex space-x-3 rounded-lg border p-3">
                <div className="text-sm font-semibold">
                  내 투표
                </div>

                <div className="flex text-sm font-semibold">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`size-5 ${
                        myVote.rating >= value
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  {myVote.sessionDetail && (
                    <div className="text-muted-foreground ml-3">
                      {myVote.sessionDetail}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="w-fit rounded-md bg-muted px-3 py-1 text-sm">
              보컬
              {" "}
              {song.vocal
                ? song.vocal.nickname
                : "없음"}
            </div>

            <div className="flex flex-wrap gap-2">
              {song.requiredParts.length === 0 ? (
                <span className="text-sm text-muted-foreground">
                  없음
                </span>
              ) : (
                song.requiredParts.map((part) => (
                  <div
                    key={part.session}
                    className="rounded-md bg-muted px-3 py-1 text-sm"
                  >
                    {part.session} {part.count}명
                  </div>
                ))
              )}
            </div>
          </div>

        </CardContent>
      </Card>

      {isVoteModalOpen && (
        <VoteModal
          key={myVote?.rating ?? "new"}
          open={isVoteModalOpen}
          onOpenChange={setIsVoteModalOpen}
          songId={song.id}
          songTitle={song.title}
          requiredParts={song.requiredParts}
          myVote={song.votes[0]}
        />
      )}
    </div>
  );
}
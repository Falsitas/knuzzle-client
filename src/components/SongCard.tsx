import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Song } from "@/types/song";
import { useState } from "react";
import VoteModal from "./VoteModal";

interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const myVote = song.votes[0];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            {song.title}
          </CardTitle>

          <CardDescription>
            {song.artist}
          </CardDescription>
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

                {myVote.voteType === "LIKE"
                  ? <div className="flex text-sm font-semibold text-orange-600">
                      하고싶다
                      {myVote.sessionDetail && (
                        <div className="text-muted-foreground ml-3">
                          {myVote.sessionDetail}
                        </div>
                      )}
                    </div>
                  : <div className="text-sm font-semibold text-blue-600">
                      하기싫다
                    </div>
                }
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
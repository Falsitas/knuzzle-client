import { getVoteTable } from "@/api/admin";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { Session } from "@/types/session";

export default function AdminPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["vote-table"],
    queryFn: getVoteTable,
  });

  const sessionOrder: Record<Session, number> = {
    VOCAL: 0,
    GUITAR: 1,
    KEYBOARD: 2,
    BASS: 3,
    DRUM: 4,
  };

  if (isLoading) {
    return <div>불러오는 중...</div>;
  }

  if (!data) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }
  
  function getInitial(session: Session) {
    switch(session) {
      case "GUITAR": return "G"
      case "BASS": return "B"
      case "DRUM": return "D"
      case "KEYBOARD": return"K"
      default: return "V"
    }
  }
  
  return (
    <div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => navigate("/mypage")}
        >
          ←
        </Button>

        <h1 className="text-2xl font-bold">
          투표 현황
        </h1>
      </div>
      
      <div className="overflow-auto max-h-[80vh] border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky top-0 left-0 z-30 bg-background w-50">
                곡
              </TableHead>

              <TableHead className="sticky top-0 left-0 z-30 bg-background">
                보컬
              </TableHead>

              <TableHead className="sticky top-0 left-0 z-30 bg-background">
                필요세션
              </TableHead>

              {data.users.map((user, userIndex) => (
                <TableHead
                  key={user.id}
                  className={`
                    sticky top-0 z-20 text-center
                    ${userIndex % 2 === 0 ? "bg-muted" : "bg-background"}
                  `}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{user.nickname}</span>
                    <Badge variant="secondary">
                      {user.primarySession}
                    </Badge>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.songs.map((song, rowIndex) => (
              <TableRow
                key={song.id}
                className={rowIndex % 2 === 0 ? "bg-muted/10" : ""}
              >
                <TableCell
                  className={`
                    sticky left-0 z-10 max-w-72 truncate font-medium
                    ${rowIndex % 2 === 0 ? "bg-muted" : "bg-background"}
                  `}
                  title={song.title}
                >
                  {song.title}
                </TableCell>

                <TableCell
                  className={`
                    ${rowIndex % 2 === 0 ? "bg-muted" : "bg-background"}
                  `}
                >
                  {song.vocalNickname}
                </TableCell>

                <TableCell
                  className={`
                    ${rowIndex % 2 === 0 ? "bg-muted" : "bg-background"}
                  `}
                >
                  {song.requiredParts.sort(
                      (a, b) => sessionOrder[a.session] - sessionOrder[b.session]
                    ).map((r) => (
                    getInitial(r.session) + r.count + " "
                  ))}
                </TableCell>

                {data.users.map((user, userIndex) => {
                  const isRowHighlighted = rowIndex % 2 === 0;
                  const isColHighlighted = userIndex % 2 === 0;
                  const isNeeded = song.requiredParts.some(
                    (part) => part.session === user.primarySession || user.primarySession === "VOCAL"
                  );

                  let cellBg = "bg-background";

                  if (isRowHighlighted && isColHighlighted) {
                    cellBg = "bg-muted/80";
                  } else if (isRowHighlighted || isColHighlighted) {
                    cellBg = "bg-muted/40";
                  }

                  return (
                    <TableCell
                      key={user.id}
                      className={`
                        text-center
                        ${cellBg}
                        ${isNeeded ? "" : "bg-red-100"}
                      `}
                    >
                      <div>
                        <div className="flex justify-center">
                          {song.votes[user.id] ? (
                            <div className="flex">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`size-4 ${
                                    i < song.votes[user.id]?.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          ) : (
                            "-"
                          )}
                        </div>
                        {song.votes[user.id]?.sessionDetail}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
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

export default function AdminPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["vote-table"],
    queryFn: getVoteTable,
  });

  if (isLoading) {
    return <div>불러오는 중...</div>;
  }

  if (!data) {
    return <div>데이터를 불러오지 못했습니다.</div>;
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
              <TableHead className="sticky top-0 left-0 z-30 bg-background w-72">
                곡
              </TableHead>

              {data.users.map((user, userIndex) => (
                <TableHead
                  key={user.id}
                  className={`
                    sticky top-0 z-20 text-center
                    ${userIndex % 2 === 0 ? "bg-muted" : "bg-background"}
                  `}
                >
                  {user.nickname}
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

                {data.users.map((user, userIndex) => {
                  const isRowHighlighted = rowIndex % 2 === 0;
                  const isColHighlighted = userIndex % 2 === 0;

                  let cellBg = "bg-background";

                  if (isRowHighlighted && isColHighlighted) {
                    cellBg = "bg-muted/80";
                  } else if (isRowHighlighted || isColHighlighted) {
                    cellBg = "bg-muted/40";
                  }

                  return (
                    <TableCell
                      key={user.id}
                      className={`${cellBg} text-center`}
                    >
                      {song.votes[user.id] ?? "-"}
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
import { useQuery } from "@tanstack/react-query";
import { getSongs } from "@/api/songs";

export default function SongListPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
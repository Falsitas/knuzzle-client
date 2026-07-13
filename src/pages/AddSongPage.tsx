import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { createSong } from "@/api/songs";
import { getVocals } from "@/api/users";
import type { User } from "@/types/user";

export default function CreateSongPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");

  const [vocals, setVocals] = useState<User[]>([]);
  const [vocalId, setVocalId] = useState<number>();

  const selected = vocals.find(v => v.id === vocalId);

  useEffect(() => {
    getVocals().then((data) => {
      setVocals(data);
    });
  }, []);

  const handleCreate = async () => {
    if (vocalId === undefined) {
      alert("보컬을 선택해주세요.");
      return;
    }

    await createSong({
      title,
      artist,
      referenceUrl,
      vocalId,
    });

    navigate("/");
  };

  return (
    <div className="flex flex-col gap-4 p-4">

      <Input
        placeholder="곡명"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        placeholder="가수"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />

      <Select
        value={vocalId?.toString()}
        onValueChange={(value) => setVocalId(Number(value))}
      >
        <SelectTrigger>
          {selected?.nickname ?? "보컬 선택"}
        </SelectTrigger>

        <SelectContent>
          {vocals.map((user) => (
            <SelectItem
              key={user.id}
              value={user.id.toString()}
            >
              {user.nickname}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="레퍼런스 링크"
        value={referenceUrl}
        onChange={(e) => setReferenceUrl(e.target.value)}
      />

      <Button onClick={handleCreate}>
        등록
      </Button>

    </div>
  );
}
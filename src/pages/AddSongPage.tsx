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
import { InstrumentCard } from "@/components/InstrumentCard";
import { getVocals } from "@/api/users";
import type { Session } from "@/types/session";
import { createSong } from "@/api/songs";

import type { User } from "@/types/user";

import { GiDrumKit, GiGuitar } from "react-icons/gi";
import { PiPianoKeysFill } from "react-icons/pi";

export default function CreateSongPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");

  const [vocals, setVocals] = useState<User[]>([]);
  const [vocalId, setVocalId] = useState<number>();

  const [requiredParts, setRequiredParts] = useState<
    {
      session: Session;
      count: number;
    }[]
  >([]);

  // max count of instruments
  const instruments = [
    {
      session: "GUITAR" as Session,
      name: "기타",
      icon: <GiGuitar />,
      max: 3,
    },
    {
      session: "KEYBOARD" as Session,
      name: "키보드",
      icon: <PiPianoKeysFill />,
      max: 2,
    },
    {
      session: "BASS" as Session,
      name: "베이스",
      icon: <GiGuitar />,
      max: 1,
    },
    {
      session: "DRUM" as Session,
      name: "드럼",
      icon: <GiDrumKit />,
      max: 1,
    },
  ];

  const selected = vocals.find((v) => v.id === vocalId);

  useEffect(() => {
    getVocals().then(setVocals);
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
      requiredParts,
    });

    navigate("/");
  };

  const handleInstrumentClick = (
    session: Session,
    max: number
  ) => {
    setRequiredParts((prev) => {
      const current = prev.find(
        (part) => part.session === session
      );

      const nextCount =
        current?.count ?? 0;

      const newCount =
        (nextCount + 1) % (max + 1);

      if (newCount === 0) {
        return prev.filter(
          (part) => part.session !== session
        );
      }

      if (current) {
        return prev.map((part) =>
          part.session === session
            ? { ...part, count: newCount }
            : part
        );
      }

      return [
        ...prev,
        {
          session,
          count: newCount,
        },
      ];
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-md space-y-6 p-4">
        <Button
          className="w-18"
          variant="outline"
          onClick={() => navigate("/")}
        >
          ←
        </Button>

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

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">
            필요한 파트
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {instruments.map((instrument) => {
              const selected = requiredParts.find(
                (part) => part.session === instrument.session
              );

              return (
                <InstrumentCard
                  key={instrument.session}
                  name={instrument.name}
                  icon={instrument.icon}
                  value={selected?.count ?? 0}
                  max={instrument.max}
                  onClick={() =>
                    handleInstrumentClick(
                      instrument.session,
                      instrument.max
                    )
                  }
                />
              );
            })}
          </div>
        </section>

        <Input
          placeholder="레퍼런스 링크"
          value={referenceUrl}
          onChange={(e) => setReferenceUrl(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={handleCreate}
        >
          등록
        </Button>
      </div>
    </main>
  );
}
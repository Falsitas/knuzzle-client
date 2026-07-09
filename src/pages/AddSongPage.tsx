import { useForm } from "react-hook-form";
import { createSong } from "@/api/songs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddSongForm {
  title: string;
  artist: string;
}

export default function AddSongPage() {
  const {
    register,
    handleSubmit,
  } = useForm<AddSongForm>();

  async function onSubmit(data: AddSongForm) {
    await createSong(data);

    console.log("created");
  }

  return (
    <main className="p-4">
      <div className="mx-auto max-w-md space-y-4">
        <h1 className="text-2xl font-bold">
          곡 추가
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input
            placeholder="곡 제목"
            {...register("title")}
          />

          <Input
            placeholder="아티스트"
            {...register("artist")}
          />

          <Button type="submit">
            추가
          </Button>
        </form>
      </div>
    </main>
  );
}
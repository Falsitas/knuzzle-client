import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function AddSongFab() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-x-0 bottom-6">
      <div className="mx-auto max-w-md p-4 space-y-4 relative">
        <Button
          size="icon"
          onClick={() => navigate("/songs/new")}
          className="
            absolute
            right-6
            bottom-[calc(env(safe-area-inset-bottom)+24px)]
            h-16
            w-16
            rounded-full
            shadow-xl
          "
        >
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
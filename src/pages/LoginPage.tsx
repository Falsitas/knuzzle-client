import { Button } from "@/components/ui/button";

import { loginWithKakao } from "@/api/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Button onClick={loginWithKakao}>
        카카오 로그인
      </Button>
    </main>
  );
}
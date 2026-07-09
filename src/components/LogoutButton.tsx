import { Button } from "@/components/ui/button";

import { logout } from "@/api/auth";

export default function LogoutButton() {
  return (
    <Button onClick={logout}>
      로그아웃
    </Button>
  );
}
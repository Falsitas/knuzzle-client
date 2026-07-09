import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";
import { getMe } from "@/api/users";

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const setUser = useAuthStore(
    (state) => state.setUser,
  );

  useEffect(() => {
    async function handleLogin() {
      const accessToken = searchParams.get("accessToken");

      if (!accessToken) {
        navigate("/login");
        return;
      }

      localStorage.setItem(
        "accessToken",
        accessToken,
      );

      const user = await getMe();

      setUser(user);

      navigate("/");
    }

    handleLogin();
  }, [
    searchParams,
    navigate,
    setUser,
  ]);

  return <div>로그인 처리 중...</div>;
}
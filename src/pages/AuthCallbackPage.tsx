import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    localStorage.setItem("accessToken", accessToken);

    navigate("/");
  }, [searchParams, navigate]);

  return (
    <div>
      로그인 처리 중...
    </div>
  );
}
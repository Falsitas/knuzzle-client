export function loginWithKakao() {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/kakao`;
}

export function logout() {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
}
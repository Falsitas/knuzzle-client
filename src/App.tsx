import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "@/router/router";
import { useAuthStore } from "@/store/authStore";

export default function App() {
  const initialize = useAuthStore(
    (state) => state.initialize,
  );

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <RouterProvider router={router} />;
}
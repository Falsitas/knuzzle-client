import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import SongListPage from "@/pages/SongListPage";
import CreateSongPage from "@/pages/CreateSongPage";
import LoginPage from "@/pages/LoginPage";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import MyPage from "@/pages/MyPage";
import EditSongPage from "@/pages/EditSongPage";
import AdminPage from "@/pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallbackPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <SongListPage />,
      },
      {
        path: "/songs/new",
        element: <CreateSongPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/songs/:id/edit",
        element: <EditSongPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      }
    ],
  },
]);
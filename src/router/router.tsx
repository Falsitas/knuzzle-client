import { createBrowserRouter } from "react-router-dom";

import SongListPage from "@/pages/SongListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SongListPage />,
  },
]);
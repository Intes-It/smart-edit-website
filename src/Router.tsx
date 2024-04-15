import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./layout/Wrapper";
import AnimeAi from "./pages/AnimeAi";
import Bokeh from "./pages/Bokeh";
import EditImage from "./pages/EditImage";
import Enhance from "./pages/Enhance";
import FaceChange from "./pages/FaceChange";
import FaceId from "./pages/FaceId";
import Notfound from "./pages/Notfound";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/",
        element: <RemoveObject />,
      },
      {
        path: "/remove-background", // Add leading slash here
        element: <RemoveBackground />,
      },
      {
        path: "/remove-background/edit",
        element: <EditImage />,
      },
      {
        path: "remove-object",
        element: <RemoveObject />,
      },
      {
        path: "face-change",
        element: <FaceChange />,
      },
      {
        path: "bokeh",
        element: <Bokeh />,
      },
      {
        path: "anime-ai",
        element: <AnimeAi />,
      },
      {
        path: "face-id",
        element: <FaceId />,
      },
      {
        path: "enhance",
        element: <Enhance />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

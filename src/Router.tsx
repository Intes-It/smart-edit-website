import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./layout/Wrapper";
import AnimeAi from "./pages/anime-ai/AnimeAi";
import EditAnimeAi from "./pages/anime-ai/EditAnimeAi";
import Bokeh from "./pages/bokeh/Bokeh";
import EditBokeh from "./pages/bokeh/EditBokeh";
import EditRemoveObject from "./pages/remove-object/EditRemoveObject";
import Enhance from "./pages/enhance/Enhance";
import EditFaceChange from "./pages/face-change/EditFaceChange";
import FaceChange from "./pages/face-change/FaceChange";
import FaceId from "./pages/face-id/FaceId";
import Notfound from "./pages/Notfound";
import EditImage from "./pages/remove-background/EditImage";
import RemoveBackground from "./pages/remove-background/RemoveBackground";
import RemoveObject from "./pages/remove-object/RemoveObject";

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
        path: "remove-object/edit",
        element: <EditRemoveObject />,
      },
      {
        path: "face-change",
        element: <FaceChange />,
      },
      {
        path: "face-change/edit",
        element: <EditFaceChange />,
      },
      {
        path: "bokeh",
        element: <Bokeh />,
      },
      {
        path: "bokeh/edit",
        element: <EditBokeh />,
      },
      {
        path: "anime-ai",
        element: <AnimeAi />,
      },
      {
        path: "anime-ai/edit",
        element: <EditAnimeAi />,
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

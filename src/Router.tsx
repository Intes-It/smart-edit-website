import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./layout/Wrapper";
import AnimeAi from "./pages/anime-ai/AnimeAi";
import EditAnimeAi from "./pages/anime-ai/EditAnimeAi";
import Bokeh from "./pages/bokeh/Bokeh";
import EditBokeh from "./pages/bokeh/EditBokeh";
import EditEchance from "./pages/enhance/EditEchance";
import Enhance from "./pages/enhance/Enhance";
import EditFaceId from "./pages/face-id/EditFaceId";
import FaceId from "./pages/face-id/FaceId";
import EditFaceChange from "./pages/faceChange/EditFaceChange";
import FaceChange from "./pages/faceChange/FaceChange";
import Notfound from "./pages/Notfound";
import EditImage from "./pages/remove-background/EditImage";
import RemoveBackground from "./pages/remove-background/RemoveBackground";
import EditRemoveObject from "./pages/remove-object/EditRemoveObject";
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
        path: "face-id/edit",
        element: <EditFaceId />,
      },
      {
        path: "enhance",
        element: <Enhance />,
      },
      {
        path: "enhance/edit",
        element: <EditEchance />,
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

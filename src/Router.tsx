import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./layout/Wrapper";
import AnimeAi from "./pages/AnimeAi";
import Bokeh from "./pages/Bokeh";
import EditBokeh from "./pages/EditBokeh";
import EditImage from "./pages/EditImage";
import Enhance from "./pages/Enhance";
import FaceChange from "./pages/FaceChange";
import EditFaceChange from "./pages/EditFaceChange";
import FaceId from "./pages/FaceId";
import Notfound from "./pages/Notfound";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import EditRemoveObject from "./pages/EditRemoveObject";

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

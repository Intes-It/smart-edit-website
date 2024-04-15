import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./layout/Wrapper";
import EditImage from "./pages/EditImage";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import RemoveObject from "./pages/RemoveObject";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/edit-image",
        element: <EditImage />,
      },
      {
        path: "/remove-object",
        element: <RemoveObject />,
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

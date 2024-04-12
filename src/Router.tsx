import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./layout/Wrapper";
import EditImage from "./pages/EditImage";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";

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
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

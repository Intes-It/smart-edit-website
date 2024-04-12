import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import EditImage from "./pages/EditImage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/edit-image",
    element: <EditImage />,
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}

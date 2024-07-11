import Home from "@/app/main/Home/home";
import MainLayout from "@/app/main/main-layout";
import Products from "@/app/main/products/products";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);

export default router;

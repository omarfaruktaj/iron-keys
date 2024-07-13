import Cart from "@/app/main/cart/cart";
import Home from "@/app/main/Home/home";
import MainLayout from "@/app/main/main-layout";
import ProductDetailsPage from "@/app/main/products/product-details";
import Products from "@/app/main/products/products";
import Chackout from "@/app/main/chackout/chackout";
import { createBrowserRouter } from "react-router-dom";
import Success from "@/app/main/chackout/success";
import Dashboard from "@/app/dashboard/dashboard";
import CreateProdct from "@/app/dashboard/create-product";
import AboutUs from "@/app/main/about/about";
import Contact from "@/app/contact/contact";

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
      {
        path: "/products/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Chackout />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/products/create",
        element: <CreateProdct />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;

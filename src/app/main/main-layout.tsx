import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { selectCart } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const cart = useAppSelector(selectCart);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (cart.length > 0) {
        const message =
          "Your cart will be empty if you leave this page. Are you sure you want to continue?";
        event.preventDefault();
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cart.length]);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Navbar />
      <div className="mx-2 md:container md:mx-auto pt-24">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

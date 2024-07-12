import { Link } from "react-router-dom";
import NavItems from "./nav-items";
import { Button } from "../ui/button";
import { FiShoppingCart } from "react-icons/fi";
import { useAppSelector } from "@/redux/hooks";
import { selectCart } from "@/redux/features/cart/cartSlice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenu3Line } from "react-icons/ri";

export default function Navbar() {
  const cart = useAppSelector(selectCart);

  return (
    <div className="w-full fixed z-50">
      <nav className="bg-background p-4 border-b-2 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div>
                <Button asChild variant={"ghost"}>
                  <Link to="/" className=" text-xl font-bold uppercase">
                    Iron Keys
                  </Link>
                </Button>
              </div>
            </div>

            <div className=" flex items-center justify-center gap-x-4">
              <div className="hidden md:block">
                <NavItems />
              </div>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="rounded-full  "
              >
                <div className="relative">
                  <Link to="/cart">
                    <FiShoppingCart className="mr-1 h-5 w-5" />
                    {cart.length !== 0 && (
                      <span className="absolute -top-3 -right-2 bg-red-600 rounded-full text-white text-xs px-1.5 py-0.5">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                </div>
              </Button>
              <Sheet>
                <SheetTrigger className="md:hidden">
                  <RiMenu3Line size={24} />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="text-start mb-4">
                      IRON KEYS
                    </SheetTitle>
                  </SheetHeader>
                  <div>
                    <NavItems />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

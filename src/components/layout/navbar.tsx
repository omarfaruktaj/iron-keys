import { Link } from "react-router-dom";
import NavItems from "./nav-items";
import { Button } from "../ui/button";
import { FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="bg-background p-4 border-b-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <Link to="/" className=" text-xl font-bold">
                Iron Keys
              </Link>
            </div>
          </div>

          <div className=" flex items-center justify-center gap-x-4">
            <div className="hidden md:block">
              <NavItems />
            </div>
            <Button variant={"ghost"} size={"icon"} className="rounded-full  ">
              <div className="relative">
                <Link to="/cart">
                  <FiShoppingCart className="mr-1 h-5 w-5" />
                  <span className="absolute -top-3 -right-2 bg-red-600 rounded-full text-white text-xs px-1.5 py-0.5">
                    0
                  </span>
                </Link>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

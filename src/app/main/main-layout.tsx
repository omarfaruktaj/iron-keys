import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className=" mx-2  md:container md:mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

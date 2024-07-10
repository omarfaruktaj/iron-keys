import { Button } from "@/components/ui/button";
import bgImage from "@/assets/bannerbg.png";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section
      className="bg-cover bg-center h-96 flex items-center justify-center text-white rounded-2xl mt-2 mb-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${bgImage})`,
      }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 uppercase">
          Welcome to Iron Keys
        </h1>
        <p className="text-xl mb-4">
          Discover the best mechanical keyboards for your needs
        </p>
        <Button asChild>
          <Link to={"/products"}>Shop Now</Link>
        </Button>
      </div>
    </section>
  );
}

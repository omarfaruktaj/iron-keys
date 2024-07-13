import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/redux/features/products/components/featured-products";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

export default function HomeFeaturedProdcuts() {
  const naviagate = useNavigate();

  const titleAnimation = useSpring({
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: -20 },
  });

  const buttonAmination = useSpring({
    opacity: 1,
    scale: 1,
    from: { opacity: 0, scale: 0.8 },
    delay: 400,
  });

  return (
    <section className="my-12">
      <animated.div style={titleAnimation}>
        <h2 className="text-3xl font-semibold text-center mx-8 mb-8">
          Featured Products
        </h2>
      </animated.div>
      <FeaturedProducts />
      <animated.div
        style={buttonAmination}
        className="flex items-center justify-end mt-8"
      >
        <Button onClick={() => naviagate("/products")}>
          <span className="mr-2">See More</span> <FaArrowRight size={16} />
        </Button>
      </animated.div>
    </section>
  );
}

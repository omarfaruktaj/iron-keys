import { Button } from "@/components/ui/button";
import bgImage from "@/assets/bannerbg.png";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

export default function Banner() {
  const titleAnimation = useSpring({
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: -20 },
  });

  const contentAnimation = useSpring({
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 20 },
    delay: 200,
  });

  const buttonAnimation = useSpring({
    opacity: 1,
    scale: 1,
    from: { opacity: 0, scale: 0.8 },
    delay: 400,
  });

  return (
    <section>
      <div
        className="bg-cover bg-center h-96 flex items-center justify-center text-white rounded-2xl mt-2 mb-8"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${bgImage})`,
        }}
      >
        <div className="text-center">
          <animated.div style={titleAnimation}>
            <h1 className="text-4xl font-bold mb-4 uppercase">
              Welcome to Iron Keys
            </h1>
          </animated.div>
          <animated.div style={contentAnimation}>
            <p className="text-xl mb-4">
              Discover the best mechanical keyboards for your needs
            </p>
          </animated.div>
          <animated.div style={buttonAnimation}>
            <Button asChild>
              <Link to="/products">Shop Now</Link>
            </Button>
          </animated.div>
        </div>
      </div>
    </section>
  );
}

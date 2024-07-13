import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const AboutUs = () => {
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
  const buttonAmination = useSpring({
    opacity: 1,
    scale: 1,
    from: { opacity: 0, scale: 0.8 },
    delay: 400,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <animated.div style={titleAnimation} className="text-center mb-12">
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="mt-4 text-lg opacity-80">
          Passionate about mechanical keyboards and bringing you the best typing
          experience!
        </p>
      </animated.div>

      <animated.div
        style={contentAnimation}
        className="max-w-4xl rounded-lg p-8"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Journey</h2>
        <p className="text-lg mb-4">
          At Iron Keys, we started with a simple goal: to provide enthusiasts
          with the best mechanical keyboards and accessories available. Our love
          for keyboards drives us to curate a unique selection that caters to
          every type of user.
        </p>

        <p className="text-lg mb-4">
          From customizable key switches to stunning RGB lighting, we believe
          that every keystroke should be a delight. Our dedicated team is
          constantly exploring new trends and technologies to ensure that we
          offer nothing but the best.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-6 text-center">
          Our Mission
        </h2>
        <p className="text-lg mb-4">
          Our mission is simple: to elevate your typing experience. We strive to
          educate our customers, share our passion, and help you find the
          perfect keyboard that fits your unique style and needs.
        </p>

        <p className="text-lg mb-4">
          Join us on this journey of discovery and excellence, and let’s make
          every keystroke count!
        </p>
      </animated.div>

      <animated.div style={buttonAmination} className="flex space-x-6">
        <Button asChild>
          <Link to="/products">Shop Now</Link>
        </Button>
      </animated.div>
    </div>
  );
};

export default AboutUs;

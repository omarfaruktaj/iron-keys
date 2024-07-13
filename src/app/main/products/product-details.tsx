import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { addProductToCart, selectCart } from "@/redux/features/cart/cartSlice";
import { useGetSingleProductQuery } from "@/redux/features/products/product-api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Rating } from "@smastrom/react-rating";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  const {
    data: product,
    isLoading,
    error,
  } = useGetSingleProductQuery(productId!);
  const titleAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(-20px)" },
  });

  const contentAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    delay: 200,
  });

  const buttonAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    delay: 400,
  });

  const cartItem = cart.find((item) => item.product._id === productId);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Something went wrong!</p>;
  if (!product) return <p>Product not found.</p>;

  const isOutOfStock = product.availableQuantity === 0;
  const isMaxQuantityReached = cartItem?.quantity === product.availableQuantity;

  return (
    <div className="min-h-screen">
      <Button
        variant="ghost"
        className="flex items-center mb-4 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-2" /> <span>Back</span>
      </Button>
      <div className="h-full px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <animated.h1
              style={titleAnimation}
              className="text-3xl font-bold mb-4"
            >
              {product.title}
            </animated.h1>
            <animated.div
              style={contentAnimation}
              className="text-muted-foreground mb-2"
            >
              Brand: {product.brand}
            </animated.div>
            <animated.div
              style={contentAnimation}
              className="text-muted-foreground mb-2"
            >
              Available Quantity: {product.availableQuantity}
            </animated.div>
            <animated.div
              style={contentAnimation}
              className="text-muted-foreground mb-2"
            >
              ${product.price}
            </animated.div>
            <div className="mb-4">
              <Rating
                style={{ maxWidth: 120 }}
                value={product.rating ?? 0}
                readOnly
              />
            </div>
            <animated.div
              style={contentAnimation}
              className="text-muted-foreground mb-6"
            >
              {product.description}
            </animated.div>
            <animated.div style={buttonAnimation}>
              <Button
                onClick={() => dispatch(addProductToCart(product))}
                disabled={isOutOfStock || isMaxQuantityReached}
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </Button>
            </animated.div>
            {isMaxQuantityReached && (
              <p className="text-red-500 mt-2">
                You’ve reached the limit for this item in your cart.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { addProductToCart, selectCart } from "@/redux/features/cart/cartSlice";
import { useGetSingleProductQuery } from "@/redux/features/products/product-api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Rating } from "@smastrom/react-rating";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

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

  const cartItem = cart.find((item) => item.product._id === productId);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Something went wrong!</p>;
  if (!product) return <p>Product not found.</p>;

  const isOutOfStock = product.availableQuantity === 0;
  const isMaxQuantityReached = cartItem?.quantity === product.availableQuantity;

  return (
    <div className="min-h-svh">
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
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <div className="text-muted-foreground mb-2">
              Brand: {product.brand}
            </div>
            <div className="text-muted-foreground mb-2">
              Available Quantity: {product.availableQuantity}
            </div>
            <div className="text-muted-foreground mb-2">${product.price}</div>
            <div className="mb-4">
              <Rating
                style={{ maxWidth: 120 }}
                value={product.rating ?? 0}
                readOnly
              />
            </div>
            <div className="text-muted-foreground mb-6">
              {product.description}
            </div>
            <Button
              onClick={() => dispatch(addProductToCart(product))}
              disabled={isOutOfStock || isMaxQuantityReached}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
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

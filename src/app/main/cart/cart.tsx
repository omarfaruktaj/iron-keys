import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProductFromCart,
  selectCart,
} from "@/redux/features/cart/cartSlice";
import CartItem from "@/redux/features/cart/components/cart-item";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const cartItems = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const naviaget = useNavigate();
  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="flex  flex-col items-center">
          <FaShoppingCart className="text-6xl text-primary mb-4" />
          <h1 className="text-4xl font-bold text-secondary-foreground mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            It seems like you haven't added anything to your cart yet.
          </p>
          <Button asChild>
            <Link to={"/products"}>Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );

  const increaseProductQuantity = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };
  const decreaseProductQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };
  const onRemove = (productId: string) => {
    dispatch(removeProductFromCart(productId));
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <Separator />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.product._id}
            item={item}
            increaseProductQuantity={increaseProductQuantity}
            decreaseProductQuantity={decreaseProductQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <div className="text-xl font-bold">Total: ${calculateTotalPrice()}</div>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          onClick={() => naviaget("/checkout")}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { CartItem as CardItemType } from "../cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

interface CartItemsProps {
  item: CardItemType;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({
  item,
  decreaseProductQuantity,
  increaseProductQuantity,
  onRemove,
}: CartItemsProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-300">
      <img
        src={item.product.image}
        alt={item.product.title}
        className="w-24 h-24 object-cover rounded-lg mb-4 md:mb-0"
      />
      <div className="flex-1 ml-0 md:ml-4 text-center md:text-left">
        <h3 className="text-lg font-bold">{item.product.title}</h3>
        <div className="text-gray-700">{item.product.brand}</div>
        <div className="text-gray-700">${item.product.price}</div>
        <div className="flex items-center justify-center md:justify-start mt-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => decreaseProductQuantity(item.product._id)}
            disabled={item.quantity === 1}
          >
            <IoMdRemove size={16} />
          </Button>
          <span className="mx-2">{item.quantity}</span>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => increaseProductQuantity(item.product._id)}
            disabled={item.quantity === item.product.availableQuantity}
          >
            <IoMdAdd size={16} />
          </Button>
        </div>
      </div>
      <Button
        variant={"destructive"}
        size={"icon"}
        onClick={() => onRemove(item.product._id)}
        className="mt-4 md:mt-0"
      >
        <FaTrashAlt size={20} />
      </Button>
    </div>
  );
}

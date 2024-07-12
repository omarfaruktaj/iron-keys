import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Rating } from "@smastrom/react-rating";
import { useNavigate } from "react-router-dom";

interface FeaturedProductProps {
  product: {
    _id: string;
    title: string;
    description: string;
    brand: string;
    image: string;
    availableQuantity: number;
    price: number;
    rating?: number;
  };
}
export default function ProductItem({ product }: FeaturedProductProps) {
  const navigate = useNavigate();
  return (
    <Card>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover mb-4 rounded-t-md"
      />
      <CardHeader className=" pt-0">
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-2">{product.brand}</p>
        <p className="text-gray-700 mb-2">
          {product.availableQuantity} in stock
        </p>
        <p className="text-gray-700 mb-2">${product.price}</p>
        <Rating
          style={{ maxWidth: 120 }}
          value={product.rating ?? 0}
          readOnly
        />
      </CardContent>
      <CardFooter className="">
        <Button onClick={() => navigate(`/products/${product._id}`)}>
          See Details
        </Button>
      </CardFooter>
    </Card>
  );
}

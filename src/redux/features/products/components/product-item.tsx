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
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover mb-4 rounded-t-md"
        />
        <CardTitle className="px-6">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-gray-700 mb-2">{product.brand}</div>
        <div className="text-gray-700 mb-2">
          {product.availableQuantity} in stock
        </div>

        <div className="text-gray-700 mb-2">${product.price}</div>
        <Rating
          style={{ maxWidth: 120 }}
          value={product.rating ?? 0}
          readOnly
        />
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate(`/products/${product._id}`)}>
          See Details
        </Button>
      </CardFooter>
    </Card>
  );
}

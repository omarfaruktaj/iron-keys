import { Button } from "@/components/ui/button";
import { useGetFeaturedProductsQuery } from "../product-api";
import ProductItem from "./product-item";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function FeaturedProducts() {
  const { isLoading, data, error } = useGetFeaturedProductsQuery(null);
  const naviagate = useNavigate();
  if (isLoading) return <>Loadding...</>;

  if (error) return <h3>No product found</h3>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.products?.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      <div className="flex items-center justify-end mt-8">
        <Button onClick={() => naviagate("/products")}>
          <span className="mr-2">See More</span> <FaArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}

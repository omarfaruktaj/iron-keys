import { useGetFeaturedProductsQuery } from "../product-api";
import FeaturedProduct from "./product-item";

export default function FeaturedProducts() {
  const {
    isLoading,
    data: products,
    error,
  } = useGetFeaturedProductsQuery(null);
  if (isLoading) return <>Loadding...</>;

  if (error) return <h3>No product found</h3>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products?.map((product) => (
        <FeaturedProduct key={product._id} product={product} />
      ))}
    </div>
  );
}

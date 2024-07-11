import { useGetFeaturedProductsQuery } from "../product-api";
import ProductItem from "./product-item";

export default function FeaturedProducts() {
  const { isLoading, data, error } = useGetFeaturedProductsQuery(null);
  console.log(data);
  if (isLoading) return <>Loadding...</>;

  if (error) return <h3>No product found</h3>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data?.products?.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
}

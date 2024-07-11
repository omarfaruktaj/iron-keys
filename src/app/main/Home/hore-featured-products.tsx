import FeaturedProducts from "@/redux/features/products/components/featured-products";

export default function HomeFeaturedProdcuts() {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <FeaturedProducts />
    </section>
  );
}

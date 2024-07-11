import Banner from "./banner";
import Services from "./Services";
import HomeFeaturedProdcuts from "./hore-featured-products";
import Brands from "./brands";
import Reviews from "./reviews";
export default function Home() {
  return (
    <div>
      <Banner />
      <Services />
      <HomeFeaturedProdcuts />
      <Brands />
      <Reviews />
    </div>
  );
}

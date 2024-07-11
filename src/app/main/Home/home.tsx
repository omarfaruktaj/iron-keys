import Banner from "./banner";
import Services from "./Services";
import HomeFeaturedProdcuts from "./hore-featured-products";
import Brands from "./brands";
import Reviews from "./reviews";
import Benefits from "./benefits";
import Subscription from "./subscription";
export default function Home() {
  return (
    <div>
      <Banner />
      <Services />
      <HomeFeaturedProdcuts />
      <Brands />
      <Reviews />
      <Benefits />
      <Subscription />
    </div>
  );
}

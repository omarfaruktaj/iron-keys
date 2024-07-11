import brand1 from "@/assets/brands/brand-1.png";
import brand2 from "@/assets/brands/brand-2.png";
import brand3 from "@/assets/brands/brand-3.png";
import brand4 from "@/assets/brands/brand-4.png";
import brand5 from "@/assets/brands/brand-5.png";
import brand6 from "@/assets/brands/brand-6.png";

export default function Brands() {
  const brands = [brand1, brand2, brand3, brand4, brand5, brand6];
  return (
    <div className="my-12">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Featured Brands
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div className="bg-primary-foreground p-6 rounded-lg shadow flex items-center justify-center">
            <img src={brand} alt="Brand 1" className="h-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

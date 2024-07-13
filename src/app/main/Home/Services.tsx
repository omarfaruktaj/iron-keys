import { FaShippingFast, FaHeadset, FaTags } from "react-icons/fa";

import ServiceCard from "@/components/ui/service-card";

export default function Services() {
  const servicesData = [
    {
      icon: <FaShippingFast className="text-5xl text-primary mb-4" />,
      title: "Free Shipping",
      description: "On all orders over $50",
    },
    {
      icon: <FaHeadset className="text-5xl text-primary mb-4" />,
      title: "24/7 Support",
      description: "We're here to help you anytime",
    },
    {
      icon: <FaTags className="text-5xl text-primary mb-4" />,
      title: "Lowest Prices",
      description: "Guaranteed best prices for quality keyboards",
    },
  ];
  return (
    <section className="my-12">
      <div className="grid grid-cols-1  md:grid-cols-3  gap-6">
        {servicesData.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Benefits() {
  const benefits = [
    {
      id: 1,
      title: "Durability and Premium Build",
      description:
        "Built to last with high-quality materials, mechanical keyboards offer superior durability and a premium typing feel.",
    },
    {
      id: 2,
      title: "Enhanced Typing Experience",
      description:
        "Enjoy tactile feedback and precise key actuation, enhancing typing speed and comfort for prolonged use.",
    },
    {
      id: 3,
      title: "Customization and Personalization",
      description:
        "Tailor your keyboard with customizable switches, keycaps, and layouts to match your style and typing preferences.",
    },
    {
      id: 4,
      title: "Advanced Gaming Features",
      description:
        "Ideal for gamers with features like n-key rollover and anti-ghosting, ensuring every keystroke is registered accurately in intense gaming sessions.",
    },
  ];
  return (
    <section className="my-12 bg-primary-foreground py-12 rounded-2xl">
      <h2 className="text-3xl text-center font-semibold leading-tight mb-8">
        Why Choose Mechanical Keyboards?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {benefits.map((benefit) => (
          <Card key={benefit.id}>
            <CardHeader>
              <CardTitle>{benefit.title}</CardTitle>
              <CardDescription>{benefit.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import customer1 from "@/assets/customers/customer-1.jpg";
import customer2 from "@/assets/customers/customer-2.jpg";
import customer3 from "@/assets/customers/customer-3.jpg";
import customer4 from "@/assets/customers/customer-4.jpg";
import customer5 from "@/assets/customers/customer-5.jpg";
import customer6 from "@/assets/customers/customer-6.jpg";
import customer7 from "@/assets/customers/customer-7.jpg";
import customer8 from "@/assets/customers/customer-8.jpg";
import customer9 from "@/assets/customers/customer-9.jpg";
import customer10 from "@/assets/customers/customer-10.jpg";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      image: customer1,
      quote: "Great keyboard! Highly recommend.",
      author: "John Doe",
    },
    {
      id: 2,
      image: customer2,
      quote: "Fantastic build quality and support.",
      author: "Jane Smith",
    },
    {
      id: 3,
      image: customer3,
      quote: "The keyboard exceeded my expectations. Solid performance.",
      author: "David Johnson",
    },
    {
      id: 4,
      image: customer4,
      quote: "Impressive design and key responsiveness. Love it!",
      author: "Emily Brown",
    },
    {
      id: 5,
      image: customer5,
      quote: "Excellent customer service. They were very helpful.",
      author: "Michael Wilson",
    },
    {
      id: 6,
      image: customer6,
      quote: "Best keyboard I've ever used. Perfect for gaming and typing.",
      author: "Sarah Davis",
    },
    {
      id: 7,
      image: customer7,
      quote: "Stylish and durable. Definitely worth the investment.",
      author: "Christopher Lee",
    },
    {
      id: 8,
      image: customer8,
      quote:
        "Fast delivery and easy setup. Couldn't be happier with my purchase.",
      author: "Jessica Martinez",
    },
    {
      id: 9,
      image: customer9,
      quote: "The customizable RGB lighting is a game-changer. So cool!",
      author: "Andrew Thompson",
    },
    {
      id: 10,
      image: customer10,
      quote: "Perfect for work-from-home setups. Comfortable and reliable.",
      author: "Olivia Garcia",
    },
  ];

  return (
    <section className="my-12">
      <h2 className="text-3xl font-semibold text-center mb-8">
        What Our Customers Say
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full  "
      >
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-center gap-2 mt-4 ">
                  <Avatar>
                    <AvatarImage src={review.image} />
                    <AvatarFallback>
                      {review.author?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <p className="text-lg italic">"{review.quote}"</p>
                  <p className="text-sm text-gray-700">- {review.author}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
}

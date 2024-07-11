import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Subscription = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="my-12 bg-white">
      <div className="text-center">
        <h2 className="text-3xl font-semibold  mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-8 text-secondary-foreground">
          Stay informed about the latest mechanical keyboards, promotions, and
          exclusive offers.
        </p>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-md rounded-sm focus-visible:ring-1  focus-visible:ring-ring focus-visible:ring-offset-1"
          />

          <Button type="submit" className="rounded-l-none">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Subscription;

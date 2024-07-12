import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { emptyCart, selectCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { useHandleOrderMutation } from "@/redux/features/products/product-api";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must be at most 50 characters long." }),

  email: z
    .string()
    .email({ message: "Must be a valid email address." })
    .min(2, { message: "Email must be at least 2 characters long." })
    .max(50, { message: "Email must be at most 50 characters long." }),

  phone: z
    .string()
    .min(2, { message: "Phone must be at least 2 characters long." })
    .max(50, { message: "Phone must be at most 50 characters long." }),

  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters long." })
    .max(50, { message: "Address must be at most 50 characters long." }),
  cod: z.boolean().default(true).optional(),
  stripe: z.boolean().default(true).optional(),
});

const Checkout = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      cod: true,
      stripe: false,
    },
  });
  const cart = useAppSelector(selectCart);
  const [handleOrder] = useHandleOrderMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    try {
      const orderData = cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      await handleOrder(orderData).unwrap();
      toast.success("Order successfull");
      navigate("/success");
      dispatch(emptyCart());
    } catch (error) {
      toast.error("Something want wrong! please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Checkout
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="col-span-1">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="col-span-1">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone" {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="cod"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                    <FormControl>
                      <Checkbox checked={field.value} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Cash on Delivery</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stripe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                    <FormControl>
                      <Checkbox disabled checked={field.value} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Stripe</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="col-span-full mt-6">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;

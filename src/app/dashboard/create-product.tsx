import ProductForm from "@/components/product-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Product,
  useCreateProductMutation,
} from "@/redux/features/products/product-api";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CreateProdct() {
  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();
  const handleSubmit = async (data: Omit<Product, "_id">) => {
    try {
      await createProduct(data).unwrap();
      toast.success("Product successfull created.");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Somethin want very wrong!");
    }
  };
  return (
    <div className="px-4 py-8 mb-10">
      <Button
        variant="ghost"
        className="flex items-center mb-4 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <FaArrowLeft className="mr-2" /> <span>Back To Dashboard</span>
      </Button>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Create New Product</h1>
        <Separator />
      </div>
      <div className="max-w-lg ">
        <ProductForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

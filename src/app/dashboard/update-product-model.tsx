import ProductForm from "@/components/product-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Product,
  useGetSingleProductQuery,
} from "@/redux/features/products/product-api";
import { DialogTitle } from "@radix-ui/react-dialog";
interface UpdateProductModel {
  onSubmit: (data: Omit<Product, "_id">) => void;
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}
export default function UpdateProductModel({
  productId,
  isOpen,
  onSubmit,
  onClose,
}: UpdateProductModel) {
  const { data } = useGetSingleProductQuery(productId);
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogTitle className="text-center text-xl">
          Updata Product
        </DialogTitle>
        <ProductForm handleSubmit={onSubmit} data={data} />
      </DialogContent>
    </Dialog>
  );
}

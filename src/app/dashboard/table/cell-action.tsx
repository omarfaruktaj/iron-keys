import {
  Product,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/products/product-api";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import AlertModal from "@/components/alert-model";
import toast from "react-hot-toast";
import UpdateProductModel from "../update-product-model";

interface CellActionProps {
  data: Product;
}

export default function CellAction({ data }: CellActionProps) {
  const [openModel, setOpenModel] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleDelete = async () => {
    try {
      await deleteProduct(data._id).unwrap();
      toast.success("Product Successfully deleted");
    } catch (error) {
      toast.error("Something want wrong! please try again.");
    }
  };

  const handleUpdateProduct = async (updatedProduct: Omit<Product, "_id">) => {
    try {
      await updateProduct({
        product: updatedProduct,
        productId: data._id,
      }).unwrap();
      toast.success("Product successfull updated.");
      setOpenUpdateModel(false);
    } catch (error) {
      toast.error("Somethin want very wrong!");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openModel}
        onClose={() => setOpenModel(false)}
        onConfirm={handleDelete}
      />
      <UpdateProductModel
        productId={data._id}
        isOpen={openUpdateModel}
        onClose={() => setOpenUpdateModel(false)}
        onSubmit={handleUpdateProduct}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setOpenUpdateModel(true)}
            className="cursor-pointer"
          >
            <FaEdit size={16} />

            <span className="ml-2">Edit</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenModel(true)}
          >
            <FaTrashAlt size={16} />
            <span className="ml-2">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

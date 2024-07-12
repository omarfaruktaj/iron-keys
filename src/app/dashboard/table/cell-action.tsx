import {
  Product,
  useDeleteProductMutation,
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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertModal from "@/components/alert-model";
import toast from "react-hot-toast";

interface CellActionProps {
  data: Product;
}

export default function CellAction({ data }: CellActionProps) {
  const [openModel, setOpenModel] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProduct(data._id).unwrap();
      toast.success("Product Successfully deleted");
    } catch (error) {
      toast.error("Something want wrong! please try again.");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openModel}
        onClose={() => setOpenModel(false)}
        onConfirm={handleDelete}
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
            className="cursor-pointer"
            onClick={() => navigate(`/dashboard/products/${data._id}`)}
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

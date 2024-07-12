import { Product } from "@/redux/features/products/product-api";
import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cell-action";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "_id",
    header: () => <div className="text-right hidden">Id</div>,
    cell: ({ row }) => {
      const id = row.getValue("_id");

      return (
        <div className="text-right font-medium hidden">{id as string}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetProductsQuery } from "@/redux/features/products/product-api";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/ui/loading";

export default function Dashboard() {
  const { data, isLoading, error } = useGetProductsQuery({ limit: 100 });
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  if (error || !data) return <div>No data found.</div>;
  const { products } = data;
  return (
    <div className="px-4 py-8 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <Button onClick={() => navigate("/dashboard/products/create")}>
          New Product
        </Button>
      </div>
      <Separator />
      <div className="my-4">
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}

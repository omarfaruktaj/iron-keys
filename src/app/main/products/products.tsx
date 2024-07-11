import ProductItem from "@/redux/features/products/components/product-item";
import { useGetProductsQuery } from "@/redux/features/products/product-api";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdKeyboardArrowLeft, MdNavigateNext } from "react-icons/md";
import { cn } from "@/lib/utils";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetProductsQuery({ page: currentPage });

  if (isLoading) return <>Loadding...</>;

  if (error) return <h4>No Product Found</h4>;

  const { page, totalPage, next, prev } = data?.pagination || {};

  const handlePreviousPage = () => {
    if (page! > 1) {
      setCurrentPage(page! - 1);
    }
  };

  const handleNextPage = () => {
    if (page! < totalPage!) {
      setCurrentPage(page! + 1);
    }
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className=" px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.products?.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      <Pagination className="my-12 flex justify-end ">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={"ghost"}
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              <div className="flex items-center justify-center">
                <MdKeyboardArrowLeft size={20} /> <div>Prevous</div>
              </div>
            </Button>
          </PaginationItem>

          {prev && (
            <PaginationItem>
              {prev && (
                <Button
                  onClick={() => handlePage(prev)}
                  variant={"ghost"}
                  size={"icon"}
                >
                  {prev}
                </Button>
              )}
            </PaginationItem>
          )}

          <PaginationItem>
            <Button size={"sm"}>{page}</Button>
          </PaginationItem>

          {next && (
            <PaginationItem>
              <Button
                onClick={() => handlePage(next)}
                size={"icon"}
                variant={"ghost"}
              >
                {next}
              </Button>
            </PaginationItem>
          )}
          <PaginationItem>
            <div
              className={cn(
                (totalPage === 1 ||
                  totalPage === page ||
                  totalPage === (page || 1) + 1) &&
                  "hidden"
              )}
            >
              <PaginationEllipsis />
            </div>
          </PaginationItem>
          <Button
            onClick={() => handlePage(totalPage || 1)}
            variant={"ghost"}
            size={"icon"}
            className={cn(
              (totalPage === 1 ||
                totalPage === page ||
                totalPage === (page || 1) + 1) &&
                "hidden"
            )}
          >
            {totalPage}
          </Button>
          <PaginationItem>
            <Button
              variant={"ghost"}
              onClick={handleNextPage}
              disabled={page === totalPage}
            >
              <div className="flex items-center justify-center">
                <div>Next</div> <MdNavigateNext size={20} />
              </div>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

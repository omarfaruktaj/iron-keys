import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { MdKeyboardArrowLeft, MdNavigateNext } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Data } from "@/redux/features/products/product-api";

interface PaginationProps {
  data: Data;
  handlePageChange: (newPage: number) => void;
}

export default function ProductPagination({
  data,
  handlePageChange,
}: PaginationProps) {
  return (
    <div>
      <Pagination className="my-12 flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => handlePageChange(data.pagination.page - 1)}
              disabled={data.pagination.page === 1}
            >
              <div className="flex items-center justify-center">
                <MdKeyboardArrowLeft size={20} />
                <div>Previous</div>
              </div>
            </Button>
          </PaginationItem>
          {data.pagination.prev && (
            <PaginationItem>
              <Button
                onClick={() => handlePageChange(data.pagination.prev ?? 0)}
                variant="ghost"
                size="icon"
              >
                {data.pagination.prev}
              </Button>
            </PaginationItem>
          )}
          <PaginationItem>
            <Button size="sm">{data.pagination.page}</Button>
          </PaginationItem>
          {data.pagination.next && (
            <PaginationItem>
              <Button
                onClick={() => handlePageChange(data.pagination.next ?? 0)}
                variant="ghost"
                size="icon"
              >
                {data.pagination.next}
              </Button>
            </PaginationItem>
          )}
          {(data.pagination.totalPage ?? 1) > 1 &&
            data.pagination.page + 1 < (data.pagination.totalPage ?? 1) && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          <PaginationItem>
            <Button
              onClick={() => handlePageChange(data.pagination.totalPage ?? 1)}
              variant="ghost"
              size="icon"
              className={cn(
                data.pagination.totalPage === data.pagination.page ||
                  data.pagination.totalPage === data.pagination.page + 1
                  ? "hidden"
                  : ""
              )}
            >
              {data.pagination.totalPage}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => handlePageChange(data.pagination.page + 1)}
              disabled={data.pagination.page === data.pagination.totalPage}
            >
              <div className="flex items-center justify-center">
                <div>Next</div>
                <MdNavigateNext size={20} />
              </div>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "@/redux/features/products/product-api";
import ProductItem from "@/redux/features/products/components/product-item";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import ProductPagination from "./product-pagination";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    searchTerm: "",
    min_price: "",
    max_price: "",
    sort_by: "",
  });

  const currentPage = Number(searchParams.get("page") || 1);
  const searchTerm = searchParams.get("searchTerm") || "";
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const sort = searchParams.get("sort_by") || "";

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);
  const [filterValues, setFilterValues] = useState({
    searchTerm: searchTerm,
    minPrice: minPrice || "",
    maxPrice: maxPrice || "",
    sort: sort,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, minPrice, maxPrice]);

  const { data, isLoading, error } = useGetProductsQuery({
    minPrice: debouncedMinPrice,
    maxPrice: debouncedMaxPrice,
    sort,
    page: currentPage,
    searchTerm: debouncedSearchTerm,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (data?.pagination?.totalPage ?? 0)) {
      setSearchParams((prev) => {
        prev.set("page", String(newPage));
        return prev;
      });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      prev.set("searchTerm", e.target.value);
      prev.set("page", "1");

      return prev;
    });
    setFilterValues((prev) => ({
      ...prev,
      page: 1,
      searchTerm: e.target.value,
    }));
  };

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      prev.set("min_price", e.target.value);
      prev.set("page", "1");

      return prev;
    });
    setFilterValues((prev) => ({ ...prev, page: 1, minPrice: e.target.value }));
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      prev.set("max_price", e.target.value);
      prev.set("page", "1");
      return prev;
    });
    setFilterValues((prev) => ({ ...prev, page: 1, maxPrice: e.target.value }));
  };

  const handleSortBy = (value: string) => {
    setSearchParams((prev) => {
      prev.set("sort_by", value);
      return prev;
    });
    setFilterValues((prev) => ({ ...prev, sort: value }));
  };

  const clearFilters = () => {
    setSearchParams({
      page: "1",
      searchTerm: "",
      min_price: "",
      max_price: "",
      sort_by: "",
    });
    setFilterValues({
      searchTerm: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
    });
  };

  const displayProducts = () => {
    if (!data || !data.products.length || error) {
      return <div className="text-xl font-semibold p-4">No Product Found!</div>;
    }

    return data.products.map((product) => (
      <ProductItem key={product._id} product={product} />
    ));
  };

  const displayPagination = () => {
    if (!data || !data.products.length || error) {
      return;
    }

    return (
      <ProductPagination data={data} handlePageChange={handlePageChange} />
    );
  };

  return (
    <div className="px-4 py-8 relative">
      <div className="mb-5">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <Separator />
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">
          <div className="p-4 bg-gray-50 rounded-lg shadow-md mb-6 md:mb-0 sticky top-24 left-0">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <div className="mb-6">
              <Input
                onChange={handleSearch}
                type="text"
                value={filterValues.searchTerm}
                placeholder="Search by name or brand"
              />
            </div>

            <div className="mb-6">
              <span className="block mb-2 font-medium">Price Range:</span>
              <div className="flex items-center">
                <Input
                  type="number"
                  onChange={handleMinPrice}
                  value={filterValues.minPrice}
                  min={1}
                  placeholder="Min"
                  className="w-1/2 mr-2"
                />
                <Input
                  type="number"
                  onChange={handleMaxPrice}
                  value={filterValues.maxPrice}
                  min={1}
                  placeholder="Max"
                  className="w-1/2"
                />
              </div>
            </div>

            <div className="mb-6">
              <span className="block mb-2 font-medium">Sort by:</span>
              <Select onValueChange={handleSortBy} value={filterValues.sort}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="-price">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={clearFilters}
                variant="destructive"
                className="w-full font-semibold"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4 md:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayProducts()}
          </div>
        </div>
      </div>
      {displayPagination()}
    </div>
  );
}

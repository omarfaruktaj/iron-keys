import { baseApi } from "@/redux/api/baseApi";

export interface Product {
  _id: string;
  title: string;
  description: string;
  brand: string;
  image: string;
  availableQuantity: number;
  price: number;
  rating?: number;
}

export interface Data {
  products: Product[];
  pagination: {
    page: number;
    totalPage: number;
    limit: number;
    next?: number;
    prev?: number;
    totalProducts: number;
  };
}

export interface QueryString {
  searchTerm?: string;
  page?: number;
  sort?: string;
  limit?: number;
  fields?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedProducts: builder.query<Data, null>({
      query: () => "/products?limit=6",
      transformResponse: (response: { data: Data }) => response.data,

      providesTags: (result) =>
        result && result.products.length > 0
          ? [
              ...result.products.map(({ _id }) => ({
                type: "Product" as const,
                id: _id,
              })),
            ]
          : [],
    }),

    getProducts: builder.query<Data, QueryString>({
      query: ({ page = 1, limit = 10 }) =>
        `/products?page=${page}&limit=${limit}`,
      transformResponse: (response: { data: Data }) => response.data,

      providesTags: (result) =>
        result && result.products.length > 0
          ? [
              ...result.products.map(({ _id }) => ({
                type: "Product" as const,
                id: _id,
              })),
            ]
          : [],
    }),
  }),
});

export const { useGetFeaturedProductsQuery, useGetProductsQuery } = productApi;

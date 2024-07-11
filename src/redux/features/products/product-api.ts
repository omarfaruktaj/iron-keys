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

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedProducts: builder.query<Product[], null>({
      query: () => "/products?limit=6",
      transformResponse: (response: { data: Product[] }) => response.data,

      providesTags: (result) =>
        result && result.length > 0
          ? [
              ...result.map(({ _id }) => ({
                type: "Product" as const,
                id: _id,
              })),
            ]
          : [],
    }),
  }),
});

export const { useGetFeaturedProductsQuery } = productApi;

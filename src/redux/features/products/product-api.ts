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

export interface Order {
  product: string;
  quantity: number;
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
      query: ({
        page = 1,
        limit = 12,
        searchTerm = "",
        minPrice,
        maxPrice,
        sort,
      }) =>
        `/products?page=${page}&limit=${limit}&searchTerm=${searchTerm}${
          minPrice && `&price[gte]=${minPrice}`
        }${maxPrice && `&price[lte]=${maxPrice}`}${sort && `&sort=${sort}`}`,
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
    getSingleProduct: builder.query<Product, string>({
      query: (productId) => `/products/${productId}`,
      transformResponse: (response: { data: Product }) => response.data,

      providesTags: (result) => {
        return result ? [{ type: "Product", id: result._id }] : [];
      },
    }),
    handleOrder: builder.mutation<{ message: string }, Order[]>({
      query: (data) => ({
        url: "/products/order",
        method: "PUT",
        body: { data },
      }),
      transformResponse: (response: { data: { message: string } }) =>
        response.data,
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetFeaturedProductsQuery,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useHandleOrderMutation,
} = productApi;

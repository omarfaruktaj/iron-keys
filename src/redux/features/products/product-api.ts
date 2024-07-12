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
const buildQueryString = (params: QueryString) => {
  const queryString = new URLSearchParams();

  for (const key in params) {
    if (params[key] !== undefined) {
      queryString.append(key, String(params[key]));
    }
  }

  return queryString.toString();
};

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
      query: (params) => {
        const {
          page = 1,
          limit = 12,
          searchTerm = "",
          minPrice,
          maxPrice,
          sort,
        } = params;

        const queryParams: QueryString = {
          page,
          limit,
          searchTerm,
          sort,
        };

        if (minPrice) queryParams["price[gte]"] = minPrice;
        if (maxPrice) queryParams["price[lte]"] = maxPrice;

        const queryString = buildQueryString(queryParams);

        return {
          url: `/products?${queryString}`,
        };
      },
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
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: { message: string } }) =>
        response.data,
      invalidatesTags: ["Product"],
    }),
    createProduct: builder.mutation<{ product: Product }, Omit<Product, "_id">>(
      {
        query: (newProduct) => ({
          url: "/products",
          method: "POST",
          body: newProduct,
        }),
        transformResponse: (response: {
          data: { message: string; product: Product };
        }) => response.data,
        invalidatesTags: ["Product"],
      }
    ),
  }),
});

export const {
  useGetFeaturedProductsQuery,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useHandleOrderMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
} = productApi;

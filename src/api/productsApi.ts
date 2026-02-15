import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  TGetProductsPayload,
  TGetProductsResponse,
} from "./productsTypes";
import { mapProductResponseToProduct } from "../utils/mapProductResponseToProduct";
import type { TProduct } from "../services/types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: TProduct[]; total: number },
      TGetProductsPayload
    >({
      query: ({ search, limit, skip, sortBy, order }) => {
        const base = search ? "/products/search" : "/products";

        return {
          url: base,
          params: {
            q: search,
            limit,
            skip,
            sortBy,
            order,
          },
        };
      },
      transformResponse: (
        response: TGetProductsResponse,
      ): { products: TProduct[]; total: number } => {
        return {
          products: response.products.map(mapProductResponseToProduct),
          total: response.total,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${JSON.stringify(queryArgs)}`;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          previousArg?.skip !== currentArg?.skip ||
          previousArg?.sortBy !== currentArg?.sortBy ||
          previousArg?.order !== currentArg?.order
        );
      },
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;

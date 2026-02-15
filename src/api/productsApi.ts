import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  TGetProductsPayload,
  TGetProductsResponse,
} from "./productsTypes";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<TGetProductsResponse, TGetProductsPayload>({
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

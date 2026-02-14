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
      query: (params) => ({
        url: "/products",
        params,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { limit, ...filters } = queryArgs;
        return `${endpointName}-${JSON.stringify(filters)}`;
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

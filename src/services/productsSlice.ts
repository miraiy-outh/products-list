import {
  createAsyncThunk,
  createSlice,
  type AsyncThunk,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { getProducts } from "../api/products";
import type { TGetProductsPayload } from "../api/productsTypes";
import type { TGetProductsResponse } from "../api/productsTypes";
import type { RootState } from "../store";
import type { TProduct } from "./types";

export const getAllProducts = createAsyncThunk<
  TGetProductsResponse,
  TGetProductsPayload
>("products/getAllProducts", async (data: TGetProductsPayload) => {
  const response = await getProducts(data);
  return response.data;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

function isPendingAction(action: UnknownAction): action is PendingAction {
  return typeof action.type === "string" && action.type.endsWith("/pending");
}
function isRejectedAction(action: UnknownAction): action is RejectedAction {
  return typeof action.type === "string" && action.type.endsWith("/rejected");
}
function isFulfilledAction(action: UnknownAction): action is FulfilledAction {
  return typeof action.type === "string" && action.type.endsWith("/fulfilled");
}

export type productsState = {
  totalCount: number;
  isLoading: boolean;
  products: TProduct[];
};

const initialState: productsState = {
  totalCount: 0,
  isLoading: true,
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      const productsData = action?.payload;
      state.totalCount = productsData.total;
      const newProducts = productsData.products.map((product) => ({
        id: product.id,
        title: product.title,
        category: product.category,
        images: product.images,
        price: product.price,
        rating: product.rating,
        stock: product.stock,
        tags: product.tags,
        brand: product.brand,
        sku: product.sku,
        minimumOrderQuantity: product.minimumOrderQuantity,
      }));
      state.products = newProducts;
    });
    builder.addMatcher(isPendingAction, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isFulfilledAction, (state) => {
      state.isLoading = false;
    });

    builder.addMatcher(isRejectedAction, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectTotalCount = (state: RootState) => state.products.totalCount;
export const selectIsLoading = (state: RootState) => state.products.isLoading;

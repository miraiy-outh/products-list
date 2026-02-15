import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { LIMIT } from "../pages/ProductsPage/ProductsBlock/contants";
import type { RootState } from "../store";
import { productsApi } from "../api/productsApi";

type TProductsState = {
  search: string;
  sortBy: string;
  order: "asc" | "desc";
  skip: number;
  limit: number;
  totalCount: number;
};

const initialState: TProductsState = {
  search: "",
  sortBy: "",
  order: "asc",
  skip: 0,
  limit: LIMIT,
  totalCount: 0,
};

export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.skip = 0;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
      state.skip = 0;
    },
    setOrder(state, action: PayloadAction<"asc" | "desc">) {
      state.order = action.payload;
      state.skip = 0;
    },
    setSkip(state, action: PayloadAction<number>) {
      state.skip = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    resetFilters(state) {
      state.search = "";
      state.sortBy = "price";
      state.order = "asc";
      state.skip = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        state.totalCount = payload.total;
      },
    );
  },
});

export const {
  setSearch,
  setSortBy,
  setOrder,
  setSkip,
  setTotalCount,
  resetFilters,
} = productsSlice.actions;

export const selectSearch = (state: RootState) => state.products.search;
export const selectSortBy = (state: RootState) => state.products.sortBy;
export const selectOrder = (state: RootState) => state.products.order;
export const selectSkip = (state: RootState) => state.products.skip;
export const selectLimit = (state: RootState) => state.products.limit;
export const selectTotalCount = (state: RootState) => state.products.totalCount;
export const selectCurrentPage = (state: RootState) =>
  Math.floor(state.products.skip / state.products.limit) + 1;
export const selectTotalPages = (state: RootState) =>
  Math.ceil(state.products.totalCount / state.products.limit);
export const selectProductsQueryParams = (state: RootState) => ({
  search: state.products.search,
  sortBy: state.products.sortBy,
  order: state.products.order,
  skip: state.products.skip,
  limit: state.products.limit,
});

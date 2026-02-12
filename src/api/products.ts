import { recordToParams } from "../utils/recordToParams";
import { instanceApi } from "./axios";
import type { TGetProductsPayload } from "./productsTypes";

export const getProducts = async (data: TGetProductsPayload) => {
  return await instanceApi.get(`/products?${recordToParams(data)}`);
};

import type { TProductResponse } from "../api/productsTypes";
import type { TProduct } from "../types";

export const mapProductResponseToProduct = (
  data: TProductResponse,
): TProduct => ({
  id: data.id,
  title: data.title,
  category: data.category,
  images: data.images,
  price: data.price,
  rating: data.rating,
  tags: data.tags,
  brand: data.brand,
  sku: data.sku,
});

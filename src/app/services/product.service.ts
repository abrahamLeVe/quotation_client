"use server";
import { ProductsInterface } from "@/models/product.model";
import { fetchDataFromApi } from "@/lib/api";

export async function getDataProducts(): Promise<ProductsInterface> {
  const res = fetchDataFromApi(`/api/products?populate=*`);
  return res;
}

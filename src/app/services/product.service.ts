"use server";
import { fetchDataFromApi } from "@/lib/api";
import { ProductsInterface } from "@/models/products.model";

export async function getDataProducts(): Promise<ProductsInterface> {
  const res = fetchDataFromApi(`/api/products?populate=*`);
  return res;
}

export async function getDataProduct(slug: string): Promise<ProductsInterface> {
  const res = fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  return res;
}

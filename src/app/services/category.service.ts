"use server";
import { fetchDataFromApi } from "@/lib/api";
import { CategoriesInterface } from "@/models/category.model";

export async function getDataCategory(): Promise<CategoriesInterface> {
  const res = fetchDataFromApi(`/api/categories?populate=*`);
  return res;
}

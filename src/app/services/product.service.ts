"use server";
import { NewArrivalInterface } from "@/models/newArrivals.model";
import { fetchDataFromApi } from "@/lib/api";

export async function getDataNewArrival(): Promise<NewArrivalInterface> {
  const res = fetchDataFromApi(
    `/api/products?populate=*&[filters][categories][slug][$eq]=new-arrivals`
  );
  return res;
}

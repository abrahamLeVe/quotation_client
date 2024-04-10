import { fetchDataFromApi } from "@/lib/api";
import { SizesInterface } from "@/models/size.model";

export async function getDataSizes(): Promise<SizesInterface> {
  const res = await fetchDataFromApi(`/api/sizes?populate=*&sort=name:asc`);
  return res;
}

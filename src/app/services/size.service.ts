import { fetchDataFromApi } from "@/lib/api";
import { SizesInterface } from "@/models/size.model";

export async function getDataSizes(): Promise<SizesInterface> {
  const res = await fetchDataFromApi(
    `/api/sizes?populate=*&sort=name:asc&pagination[page]=1&pagination[pageSize]=999`
  );
  return res;
}

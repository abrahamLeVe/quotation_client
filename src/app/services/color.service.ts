import { fetchDataFromApi } from "@/lib/api";
import { ColorsInterface } from "@/models/colors.model";

export async function getColorProductById(id: number): Promise<ColorsInterface> {
  const res = fetchDataFromApi(
    `/api/product-colors?populate=*&[filters][id][$eq]=${id}`
  );
  return res;
}
import { fetchDataFromApi } from "@/lib/api";
import { BrandsInterface } from "@/models/brand";
import { populate } from "@/models/filter.model";
import { ProductsInterface } from "@/models/products.model";
let qs = require("qs");

export async function getDataBrand(): Promise<BrandsInterface> {
  const res = fetchDataFromApi(`/api/brands?populate=*`);
  return res;
}

export async function filterProductsByBrand(
  query?: string
): Promise<ProductsInterface | undefined> {
  if (!query) {
    return;
  }

  const cleanedQuery = decodeURIComponent(query || "").trim();
  if (cleanedQuery.length === 0) {
    return;
  }

  try {
    const filter = {
      brand: {
        name: {
          $eq: cleanedQuery,
        },
      },
    };

    const queryString = qs.stringify(
      { sort: ["name:asc"], populate, filters: filter },
      {
        encodeValuesOnly: true,
      }
    );

    const res = await fetchDataFromApi(`/api/products?${queryString}`);
    return res;
  } catch (error) {
    console.log("error in filterProductsByBrand", error);
  }
}

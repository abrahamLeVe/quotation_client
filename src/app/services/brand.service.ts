import { fetchDataFromApi } from "@/lib/api";
import { BrandsInterface } from "@/models/brand";
import { ProductsInterface } from "@/models/products.model";
import { processQuery } from "@/utilities/validators/search.validator";
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

  const cleanedQuery = processQuery(query);
  if (cleanedQuery.length === 0) {
    return;
  }

  try {
    const filter = {
      brand: {
        name: {
          $containsi: cleanedQuery,
        },
      },
    };

    const queryString = qs.stringify(
      { filters: filter, populate: "*" },
      {
        encodeValuesOnly: true,
      }
    );

    const res = await fetchDataFromApi(`/api/products?${queryString}`);
    return res;
  } catch (error) {
    console.log("error in filterProducts", error);
  }
}

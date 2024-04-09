import { fetchDataFromApi } from "@/lib/api";
import { CategoriesInterface } from "@/models/category.model";
import { populate } from "@/models/filter.model";
import { ProductsInterface } from "@/models/products.model";
import { processQuery } from "@/utilities/validators/search.validator";
let qs = require("qs");

export async function getDataCategory(): Promise<CategoriesInterface> {
  const res = await fetchDataFromApi(
    `/api/categories?populate=*&sort=name:asc`
  );
  return res;
}

export async function filterProductsByCategory(
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
      categories: {
        name: {
          $containsi: cleanedQuery,
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
    console.log("error in filterProducts", error);
  }
}

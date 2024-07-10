import { fetchDataFromApi } from "@/lib/api";
import { CategoriesInterface } from "@/models/category.model";
import { populate } from "@/models/filter.model";
import { ProductsInterface } from "@/models/products.model";
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
  const cleanedQuery = decodeURIComponent(query || "").trim();
  if (cleanedQuery.length === 0) {
    return;
  }

  try {
    const filter = {
      categories: {
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
    const res = await fetchDataFromApi(
      `/api/products?${queryString}&pagination[page]=1&pagination[pageSize]=999`
    );
    return res;
  } catch (error) {
    console.log("error in filterProductsByCategory", error);
  }
}

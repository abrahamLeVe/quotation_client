import { fetchDataFromApi } from "@/lib/api";
import { populate } from "@/models/filter.model";
import { ProductsInterface } from "@/models/products.model";
import { processQuery } from "@/lib/validations/search.validator";
let qs = require("qs");

export const getDataProducts = async (): Promise<ProductsInterface> => {
  const queryString = qs.stringify(
    { sort: ["name:asc"], populate },
    { encodeValuesOnly: true }
  );
  const res = await fetchDataFromApi(
    `/api/products?${queryString}&pagination[page]=1&pagination[pageSize]=999`
  );
  return res;
};

export const getDataProductBySlug = async (
  slug: string
): Promise<ProductsInterface> => {
  const filter = {
    slug: {
      $eq: slug,
    },
  };

  const queryString = qs.stringify(
    { sort: ["name:asc"], populate, filters: filter },
    { encodeValuesOnly: true }
  );
  const res = await fetchDataFromApi(`/api/products?${queryString}`);

  return res;
};

export async function filterProducts(
  query?: string
): Promise<ProductsInterface | undefined> {
  if (!query) {
    return;
  }
  const cleanedQuery = processQuery(query);
  // const cleanedQuery = decodeURIComponent(query || "").trim();
  // console.log("cleanedQuery ", cleanedQuery);
  if (cleanedQuery.length === 0) {
    return;
  }

  const filter = {
    $or: [
      {
        description: {
          $containsi: cleanedQuery,
        },
      },
      {
        name: {
          $containsi: cleanedQuery,
        },
      },
    ],
  };
  try {
    const queryString = qs.stringify(
      { sort: ["name:asc"], populate, filters: filter },
      { encodeValuesOnly: true }
    );
    const res = await fetchDataFromApi(`/api/products?${queryString}`);

    return res;
  } catch (error) {
    console.log("error in filterProducts", error);
  }
}

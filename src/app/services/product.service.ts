"use server";
import { fetchDataFromApi } from "@/lib/api";
import { populate } from "@/models/filter.model";
import { ProductsInterface } from "@/models/products.model";
import { processQuery } from "@/utilities/validators/search.validator";
let qs = require("qs");

export async function getDataProducts(): Promise<ProductsInterface> {
  const queryString = qs.stringify(
    { sort: ["name:asc"], populate },
    { encodeValuesOnly: true }
  );
  const res = await fetchDataFromApi(`/api/products?${queryString}`);
  return res;
}

export async function getDataProductBySlug(
  slug: string
): Promise<ProductsInterface> {
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
}

export async function getDataProductById(
  id: number
): Promise<ProductsInterface> {
  const res = fetchDataFromApi(
    `/api/products?populate=*&filters[id][$eq]=${id}`
  );
  return res;
}

export async function filterProducts(
  query?: string
): Promise<ProductsInterface | undefined> {
  if (!query) {
    return;
  }
  const cleanedQuery = processQuery(query);
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

import { fetchDataFromApi } from "@/lib/api";
import { populate } from "@/models/filter.model";
import { ProductsInterface } from "@/models/products.model";
import { processQuery } from "@/utilities/validators/search.validator";
import { cache } from "react";
let qs = require("qs");

export const getDataProducts = cache(async (): Promise<ProductsInterface> => {
  const queryString = qs.stringify(
    { sort: ["name:asc"], populate },
    { encodeValuesOnly: true }
  );
  const res = await fetchDataFromApi(`/api/products?${queryString}`);
  return res;
});

export const getDataProductSlug = async (): Promise<ProductsInterface> => {
  const res = await fetchDataFromApi(`/api/products`);
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

export const getDataProductsNSU = cache(
  async (): Promise<ProductsInterface> => {
    const fieldsToPopulate = {
      populate: ["thumbnail"],
    };

    const queryString = qs.stringify(fieldsToPopulate, {
      encodeValuesOnly: true,
    });
    const res = await fetchDataFromApi(`/api/products?${queryString}`);
    return res;
  }
);

import { fetchDataFromApi } from "@/lib/api";
import { ProductsInterface } from "@/models/products.model";
import { processQuery } from "@/utilities/validators/search.validator";
let qs = require("qs");

export const populate = {
  image: {
    populate: ["data"],
  },
  thumbnail: {
    populate: ["data"],
  },
  categories: {
    populate: ["data"],
  },
  brand: {
    populate: ["data"],
  },
  product_colors: {
    populate: ["data"],
  },
  prices: {
    populate: {
      product_colors: {
        populate: ["data"],
      },
      model: {
        populate: ["data"],
      },
      size: {
        populate: ["category"],
      },
    },
  },
};

export async function getDataProducts(): Promise<ProductsInterface> {
  const queryString = qs.stringify({ populate }, { encodeValuesOnly: true });
  const res = fetchDataFromApi(`/api/products?${queryString}`);
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
    { populate, filters: filter },
    { encodeValuesOnly: true }
  );

  const res = fetchDataFromApi(`/api/products?${queryString}`);
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
      { populate, filters: filter },
      { encodeValuesOnly: true }
    );
    const res = await fetchDataFromApi(`/api/products?${queryString}`);

    return res;
  } catch (error) {
    console.log("error in filterProducts", error);
  }
}

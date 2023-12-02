import { fetchDataFromApi } from "@/lib/api";
import { ProductsInterface } from "@/models/products.model";
import { processQuery } from "@/utilities/validators/search.validator";
let qs = require("qs");

export async function getDataProducts(): Promise<ProductsInterface> {
  const res = fetchDataFromApi(`/api/products?populate=*`);
  return res;
}

export async function getDataProductBySlug(
  slug: string
): Promise<ProductsInterface> {
  const res = fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
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
  try {
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

    const queryString = qs.stringify(
      { filters: filter },
      {
        encodeValuesOnly: true,
      }
    );

    const res = await fetchDataFromApi(
      `/api/products?populate=*&${queryString}`
    );

    return res;
  } catch (error) {
    console.log("error in filterProducts", error);
  }
}

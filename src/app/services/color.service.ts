import { fetchDataFromApi } from "@/lib/api";
import { ColorsInterface } from "@/models/colors.model";
import { ProductsInterface } from "@/models/products.model";
import { processQuery } from "@/utilities/validators/search.validator";
import { populate } from "./product.service";
let qs = require("qs");

export async function getDataColor(): Promise<ColorsInterface> {
  const res = fetchDataFromApi(`/api/product-colors?populate=*`);
  return res;
}

export async function filterProductsByColor(
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
      product_colors: {
        Name: {
          $containsi: cleanedQuery,
        },
      },
    };

    const queryString = qs.stringify(
      { populate, filters: filter },
      {
        encodeValuesOnly: true,
      }
    );

    const res = await fetchDataFromApi(`/api/products?${queryString}`);
    console.log("data color service", res);
    return res;
  } catch (error) {
    console.log("error in filterProducts", error);
  }
}

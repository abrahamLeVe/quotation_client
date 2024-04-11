import { fetchDataFromApi } from "@/lib/api";
import { BrandsInterface } from "@/models/brand";
import { CategoriesInterface } from "@/models/category.model";
import { ProductsInterface } from "@/models/products.model";
import { cache } from "react";
let qs = require("qs");

export const getDataSlugProducts = cache(
  async (): Promise<ProductsInterface> => {
    const queryString = qs.stringify(
      {
        sort: ["name:asc"],
        fields: ["slug"],
        populate: {},
      },
      { encodeValuesOnly: true }
    );
    console.log("queryString ", queryString);
    const res = await fetchDataFromApi(`/api/products?${queryString}`);
    return res;
  }
);

export const getDataNameCategories = cache(
  async (): Promise<CategoriesInterface> => {
    const queryString = qs.stringify(
      {
        sort: ["name:asc"],
        fields: ["name"],
        populate: {},
      },
      { encodeValuesOnly: true }
    );
    console.log("queryString ", queryString);
    const res = await fetchDataFromApi(`/api/categories?${queryString}`);
    return res;
  }
);

export const getDataNameBrans = cache(async (): Promise<BrandsInterface> => {
  const queryString = qs.stringify(
    {
      sort: ["name:asc"],
      fields: ["name"],
      populate: {},
    },
    { encodeValuesOnly: true }
  );
  console.log("queryString ", queryString);
  const res = await fetchDataFromApi(`/api/brands?${queryString}`);
  return res;
});

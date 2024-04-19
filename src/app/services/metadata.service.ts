import { fetchDataFromApi } from "@/lib/api";
import { BrandsInterface } from "@/models/brand";
import { CategoriesInterface } from "@/models/category.model";
import { ProductsInterface } from "@/models/products.model";
let qs = require("qs");

export const getDataSlugProducts = async (): Promise<ProductsInterface> => {
  const queryString = qs.stringify(
    {
      sort: ["name:asc"],
      fields: ["slug"],
      populate: ["thumbnail"],
    },
    { encodeValuesOnly: true }
  );
  const res = await fetchDataFromApi(`/api/products?${queryString}`);
  return res;
};

export const getDataNameCategories = async (): Promise<CategoriesInterface> => {
  const queryString = qs.stringify(
    {
      sort: ["name:asc"],
      fields: ["name"],
      populate: ["image"],
    },
    { encodeValuesOnly: true }
  );
  const res = await fetchDataFromApi(`/api/categories?${queryString}`);
  return res;
};

export const getDataNameBrans = async (): Promise<BrandsInterface> => {
  const queryString = qs.stringify(
    {
      sort: ["name:asc"],
      fields: ["name"],
      populate: ["image"],
    },
    { encodeValuesOnly: true }
  );
  const res = await fetchDataFromApi(`/api/brands?${queryString}`);
  return res;
};

export const getDataNameProducts = async (): Promise<ProductsInterface> => {
  const queryString = qs.stringify(
    {
      sort: ["name:asc"],
      fields: ["name"],
    },
    { encodeValuesOnly: true }
  );
  const res = await fetchDataFromApi(`/api/products?${queryString}`);
  return res;
};

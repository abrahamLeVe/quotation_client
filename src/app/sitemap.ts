import { CLIENT_URL } from "@/utilities/urls";
import {
  getDataNameBrans,
  getDataNameCategories,
  getDataSlugProducts,
} from "./services/metadata.service";

export default async function sitemap() {
  const productsData = await getDataSlugProducts();
  const categoriesData = await getDataNameCategories();
  const brandsData = await getDataNameBrans();
  const products = productsData.data.map((product) => ({
    url: `${CLIENT_URL}/product/${product.attributes.slug}`,
  }));

  const categories = categoriesData.data.map((product) => ({
    url: `${CLIENT_URL}/filter/category?query=${product.attributes.name}`,
  }));

  const brands = brandsData.data.map((product) => ({
    url: `${CLIENT_URL}/filter/brand?query=${product.attributes.name}`,
  }));

  return [...products, ...categories, ...brands];
}

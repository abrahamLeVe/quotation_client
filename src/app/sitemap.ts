import { CLIENT_URL } from "@/utilities/urls";
import type { MetadataRoute } from "next";
import {
  getDataNameBrans,
  getDataNameCategories,
  getDataSlugProducts,
} from "./services/metadata.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productsData = await getDataSlugProducts();
  const categoriesData = await getDataNameCategories();
  const brandsData = await getDataNameBrans();

  const products = productsData.data.map((product) => ({
    url: `${CLIENT_URL}/product/${product.attributes.slug}, img:${product.attributes.thumbnail.data.attributes.formats.thumbnail.url}`,
  }));

  const categories = categoriesData.data.map((category) => ({
    url: `${CLIENT_URL}/filter/category?query=${category.attributes.name}, img:${category.attributes.image.data.attributes.formats.thumbnail.url}`,
  }));

  const brands = brandsData.data.map((brand) => ({
    url: `${CLIENT_URL}/filter/brand?query=${brand.attributes.name}, img:${brand.attributes.image.data?.attributes.formats.thumbnail.url}`,
  }));

  const routes = ["/nosotros", "/contact"].map((route) => ({
    url: `${CLIENT_URL}${route}`,
  }));

  return [...products, ...categories, ...brands, ...routes];
}

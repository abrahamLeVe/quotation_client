import { CLIENT_URL } from "@/utilities/urls";
import { getDataProducts } from "./services/product.service";

export default async function sitemap() {
  const data = await getDataProducts();

  const products = data.data.map((product) => ({
    url: `${CLIENT_URL}/product/${product.attributes.slug}`,
  }));

  const routes = [
    "/",
    "/filter/category?query=",
    "/filter/brand?query=",
    "/filter/search?query=Aquí busca por coincidencia en el nombre de los productos",
    "/cart",
  ].map((route) => ({
    url: `${CLIENT_URL}${route}`,
  }));

  return [...routes, ...products];
}

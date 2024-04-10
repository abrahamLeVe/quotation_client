import { filterProductsByBrand } from "@/app/services/brand.service";
import dynamic from "next/dynamic";
const ProductTable = dynamic(() => import("../filter/FilterTable"));

export default async function BrandIndex({
  query,
  name,
}: {
  query?: string;
  name: string;
}) {
  const products = await filterProductsByBrand(query);

  return <ProductTable key={query} products={products} name={name} />;
}

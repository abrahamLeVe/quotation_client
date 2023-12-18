import { filterProductsByBrand } from "@/app/services/brand.service";
import dynamic from "next/dynamic";
const ProductTable = dynamic(() => import("../filter/FilterTable"));

export default async function BrandIndex({ query }: { query?: string }) {
  const products = await filterProductsByBrand(query);

  return <ProductTable key={query} products={products} />;
}

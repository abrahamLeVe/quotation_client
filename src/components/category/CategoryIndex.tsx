import { filterProductsByCategory } from "@/app/services/category.service";
import dynamic from "next/dynamic";

const ProductTable = dynamic(() => import("../filter/FilterTable"));

export default async function CategoryIndex({ query }: { query?: string }) {
  const products = await filterProductsByCategory(query);

  return <ProductTable key={query} products={products} />;
}

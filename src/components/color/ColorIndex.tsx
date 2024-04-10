import { filterProductsByColor } from "@/app/services/color.service";
import dynamic from "next/dynamic";

const ProductTable = dynamic(() => import("../filter/FilterTable"));

export default async function ColorIndex({ query }: { query?: string }) {
  const products = await filterProductsByColor(query);

  return <ProductTable key={query} products={products} name="Color" />;
}

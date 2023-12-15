import { filterProducts } from "@/app/services/product.service";
const ProductTable = dynamic(() => import("./FilterTable"));

import dynamic from "next/dynamic";

export default async function FilterIndex({ query }: { query?: string }) {
  const products = await filterProducts(query);

  return <ProductTable key={query} products={products} />;
}

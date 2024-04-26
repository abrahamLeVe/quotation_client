import { filterProducts } from "@/app/services/product.service";
import dynamic from "next/dynamic";
const ProductTable = dynamic(() => import("./FilterTable"));

export default async function FilterIndex({ query }: { query?: string }) {
  const products = await filterProducts(query);

  return (
    <ProductTable products={products} name="Producto" isFilter query={query} />
  );
}

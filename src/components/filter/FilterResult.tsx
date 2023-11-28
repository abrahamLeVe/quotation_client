// "use client";
import { filterProducts } from "@/app/services/product.service";
import ProductTable from "./table";

export default async function FilterResult({ query }: { query?: string }) {
  const products = await filterProducts(query);

  return (
    <div className="w-full">
      {/* <ProductTable products={products?.data} /> */}
    </div>
  );
}

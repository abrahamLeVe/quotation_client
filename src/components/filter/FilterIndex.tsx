"use client";
import { filterProducts } from "@/app/services/product.service";
import { useDebounce } from "@/hooks/use-debounce";
import { ProductsInterface } from "@/models/products.model";
import dynamic from "next/dynamic";
import { useEffect, useState, useTransition } from "react";
import { ProductsTableSkeleton } from "../skeleton/product/ProductSkeleton";
const ProductTable = dynamic(() => import("@/components/filter/FilterTable"), {
  ssr: false,
});

export default function FilterIndex({ query }: { query?: string }) {
  const debouncedQuery = useDebounce(query, 300);
  const [products, setProducts] = useState<ProductsInterface | undefined>(
    undefined
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!debouncedQuery) {
      setProducts(undefined);
      return;
    }

    async function getProducts() {
      try {
        const products = await filterProducts(debouncedQuery);

        setProducts(products);
      } catch (err) {
        console.log(err);
      }
    }

    startTransition(getProducts);

    return () => setProducts(undefined);
  }, [debouncedQuery]);

  return (
    <>
      {isPending ? (
        <ProductsTableSkeleton />
      ) : (
        <ProductTable products={products} />
      )}
    </>
  );
}

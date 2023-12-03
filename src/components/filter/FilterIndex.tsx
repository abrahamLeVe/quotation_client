"use client";
import { filterProducts } from "@/app/services/product.service";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useTransition } from "react";
import { ProductsTableSkeleton } from "../skeleton/product/ProductSkeleton";
import { useFilterContext } from "@/context/filter.context";

export default function FilterIndex({ query }: { query?: string }) {
  const debouncedQuery = useDebounce(query, 300);
  const { setProductsFilter } = useFilterContext();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!debouncedQuery) {
      setProductsFilter(undefined);
      return;
    }

    async function getProducts() {
      try {
        const products = await filterProducts(debouncedQuery);

        setProductsFilter(products);
      } catch (err) {
        console.log(err);
      }
    }

    startTransition(getProducts);

    return () => setProductsFilter(undefined);
  }, [debouncedQuery]);

  return <>{isPending && <ProductsTableSkeleton />}</>;
}

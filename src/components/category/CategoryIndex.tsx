"use client";
import { filterProductsByCategory } from "@/app/services/category.service";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useTransition } from "react";
import { ProductsTableSkeleton } from "../skeleton/product/ProductSkeleton";
import { useFilterContext } from "@/context/filter.context";

export default function CategoryIndex({ query }: { query?: string }) {
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
        const products = await filterProductsByCategory(debouncedQuery);

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

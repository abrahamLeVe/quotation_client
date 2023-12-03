"use client";
import { filterProductsByCategory } from "@/app/services/category.service";
import { useFilterContext } from "@/context/filter.context";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect } from "react";

export default function CategoryIndex({ query }: { query?: string }) {
  const debouncedQuery = useDebounce(query, 300);
  const { setProductsFilter, setIsPending } = useFilterContext();
  useEffect(() => {
    if (!debouncedQuery) {
      setProductsFilter(undefined);
      return;
    }
    (async () => {
      setIsPending(true);
      try {
        const products = await filterProductsByCategory(debouncedQuery);
        setProductsFilter(products);
      } catch (error) {
        console.log(error);
      }
      setIsPending(false);
    })();
  }, [debouncedQuery, setProductsFilter, setIsPending]);

  return <></>;
}

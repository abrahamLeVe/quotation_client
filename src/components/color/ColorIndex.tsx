"use client";
import { filterProductsByColor } from "@/app/services/color.service";
import { useFilterContext } from "@/context/filter.context";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect } from "react";

export default function ColorIndex({ query }: { query?: string }) {
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
        const products = await filterProductsByColor(debouncedQuery);
        setProductsFilter(products);
      } catch (error) {
        console.log(error);
      }
      setIsPending(false);
    })();
  }, [debouncedQuery, setProductsFilter, setIsPending]);

  return null;
}

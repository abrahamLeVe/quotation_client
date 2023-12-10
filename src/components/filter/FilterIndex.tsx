"use client";
import { filterProducts } from "@/app/services/product.service";
import { useFilterContext } from "@/context/filter.context";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect } from "react";

export default function FilterIndex({ query }: { query?: string }) {
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
        const products = await filterProducts(debouncedQuery);
        setProductsFilter(products);
      } catch (error) {
        console.log(error);
      }
      setIsPending(false);
    })();
  }, [debouncedQuery, setProductsFilter, setIsPending]);

  return null;
}

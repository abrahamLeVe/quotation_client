"use client";
import { filterProductsByBrand } from "@/app/services/brand.service";
import { useFilterContext } from "@/context/filter.context";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect } from "react";

export default function BrandIndex({ query }: { query?: string }) {
  const debouncedQuery = useDebounce(query, 300);
  const { setProductsFilter, setIsPending, cleanFilter } = useFilterContext();
  useEffect(() => {
    if (!debouncedQuery) {
      setProductsFilter(undefined);
      return;
    }
    (async () => {
      cleanFilter();
      setIsPending(true);
      try {
        const products = await filterProductsByBrand(debouncedQuery);
        setProductsFilter(products);
      } catch (error) {
        console.log(error);
      }
      setIsPending(false);
    })();
  }, [debouncedQuery, setProductsFilter, setIsPending]);

  return null;
}

import FilterIndex from "@/components/filter/FilterIndex";
import { ProductsTableSkeleton } from "@/components/skeleton/product/ProductSkeleton";
import { Suspense } from "react";

export default async function FilterProductPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query;
  return (
    <Suspense key={query} fallback={<ProductsTableSkeleton />}>
      <FilterIndex query={query} />
    </Suspense>
  );
}

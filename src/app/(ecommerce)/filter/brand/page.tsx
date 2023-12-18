import BrandIndex from "@/components/brand/BrandIndex";
import { ProductsTableSkeleton } from "@/components/skeleton/product/ProductSkeleton";
import { Suspense } from "react";

export default async function BrandPage({
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
      <BrandIndex query={query} />
    </Suspense>
  );
}

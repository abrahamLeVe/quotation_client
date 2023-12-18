import CategoryIndex from "@/components/category/CategoryIndex";
import { ProductsTableSkeleton } from "@/components/skeleton/product/ProductSkeleton";
import { Suspense } from "react";

export default async function CategoryPage({
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
      <CategoryIndex query={query} />
    </Suspense>
  );
}

import ColorIndex from "@/components/color/ColorIndex";
import { ProductsTableSkeleton } from "@/components/skeleton/product/ProductSkeleton";
import { Suspense } from "react";

export default async function ColorPage({
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
      <ColorIndex query={query} />
    </Suspense>
  );
}

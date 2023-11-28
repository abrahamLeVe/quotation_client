import ProductTable from "@/components/filter/table";
import ProductSearch from "@/components/ui/Search";
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
    <>
      <ProductSearch placeholder={"Buscar productos..."} />
      <Suspense key={query} fallback={<ProductsTableSkeleton />}>
        <ProductTable query={searchParams.query} />
        <ProductsTableSkeleton />
      </Suspense>
    </>
  );
}

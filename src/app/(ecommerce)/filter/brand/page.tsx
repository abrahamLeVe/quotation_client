// import ProductTable from "@/components/filter/table";
import ProductSearch from "@/components/ui/Search";
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
  console.log(query?.toString());

  return (
    <>
      <ProductSearch placeholder={"Buscar productos..."} />
      <Suspense key={query} fallback={<ProductsTableSkeleton />}>
        {/* <ProductTable query={searchParams.query} /> */}
      </Suspense>
    </>
  );
}

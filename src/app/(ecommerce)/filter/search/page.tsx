import FilterIndex from "@/components/filter/FilterIndex";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
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
      <Breadcrumbs
        segments={[
          {
            title: "Inicio",
            href: "/",
          },
          {
            title: "Busqueda en todos los productos",
            href: ``,
          },
        ]}
      />
      {/* <Suspense key={query} fallback={<ProductsTableSkeleton />}> */}
      <FilterIndex query={query} />
      {/* </Suspense> */}
    </>
  );
}

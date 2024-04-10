import BrandIndex from "@/components/brand/BrandIndex";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
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
    <>
      <Breadcrumbs
        segments={[
          {
            title: "Inicio",
            href: "/",
          },
          {
            title: "Busqueda de productos",
            href: `/filter/search`,
          },
          {
            title: "Marcas",
            href: ``,
          },
        ]}
      />
      {/* <Suspense key={query} fallback={<ProductsTableSkeleton />}> */}
      <BrandIndex query={query} name="Marca" />
      {/* </Suspense> */}
    </>
  );
}

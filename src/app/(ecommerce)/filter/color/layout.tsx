"use client";
import ProductTable from "@/components/filter/FilterTable";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { ProductsTableSkeleton } from "@/components/skeleton/product/ProductSkeleton";
import ProductSearch from "@/components/ui/Search";
import { useFilterContext } from "@/context/filter.context";

export default function ColorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { productsFilter, isPending } = useFilterContext();
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
            title: "Por Color",
            href: `/filter/category`,
          },
        ]}
      />
      <ProductSearch
        placeholder={"Buscar marca..."}
        title={"Marca: "}
      />
      {isPending ? (
        <ProductsTableSkeleton />
      ) : (
        <ProductTable products={productsFilter} />
      )}
      {children}
    </>
  );
}

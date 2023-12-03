"use client";
import ProductTable from "@/components/filter/FilterTable";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import ProductSearch from "@/components/ui/Search";
import { useFilterContext } from "@/context/filter.context";

export default function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { productsFilter } = useFilterContext();
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
        ]}
      />
      <ProductSearch placeholder={"Buscar productos..."} title={"Producto: "} />
      <ProductTable products={productsFilter} />
      {children}
    </>
  );
}

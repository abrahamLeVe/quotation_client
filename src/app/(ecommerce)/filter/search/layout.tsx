"use client";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import ProductSearch from "@/components/ui/Search";
import { Suspense } from "react";

export default function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <Suspense>
        <ProductSearch
          placeholder={"Buscar productos..."}
          title={"Producto: "}
        />
      </Suspense>
      {children}
    </>
  );
}

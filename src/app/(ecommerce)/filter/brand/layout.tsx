"use client";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import ProductSearch from "@/components/ui/Search";
import { Suspense } from "react";

export default function BrandLayout({
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
          {
            title: "Por Marca",
            href: `/filter/category`,
          },
        ]}
      />
      <Suspense>
        <ProductSearch placeholder={"Buscar marca..."} title={"Marca: "} />
      </Suspense>
      {children}
    </>
  );
}

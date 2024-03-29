"use client";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import ProductSearch from "@/components/ui/search";
import { Suspense } from "react";

export default function CategoryLayout({
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
            title: "Por categoría",
            href: `/filter/category`,
          },
        ]}
      />
      <Suspense>
        <ProductSearch
          placeholder={"Buscar categoría..."}
          title={"Categoría: "}
        />
      </Suspense>
      {children}
    </>
  );
}

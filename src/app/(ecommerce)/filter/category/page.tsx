import { filterProductsByCategory } from "@/app/services/category.service";
// import ProductTable from "@/components/filter/FilterTable";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

import dynamic from "next/dynamic";

const ProductTable = dynamic(() => import("@/components/filter/FilterTable"), {
  ssr: false,
});

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query;
  const products = await filterProductsByCategory(searchParams?.query);
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
            title: `Categorias`,
            href: ``,
          },
        ]}
      />
      <ProductTable products={products} name="Categoría" query={query} />
    </>
  );
}

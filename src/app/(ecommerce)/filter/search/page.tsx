import { filterProducts } from "@/app/services/product.service";
// import ProductTable from "@/components/filter/FilterTable";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

import dynamic from "next/dynamic";

const ProductTable = dynamic(() => import("@/components/filter/FilterTable"), {
  ssr: false,
});

export default async function FilterProductPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query;
  const products = await filterProducts(query);
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
      <ProductTable
        products={products}
        name="Producto"
        isFilter
        query={query}
      />
    </>
  );
}

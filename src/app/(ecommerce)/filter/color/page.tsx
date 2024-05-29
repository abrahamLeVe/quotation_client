import { filterProductsByColor } from "@/app/services/color.service";
// import ProductTable from "@/components/filter/FilterTable";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

import dynamic from "next/dynamic";

const ProductTable = dynamic(() => import("@/components/filter/FilterTable"), {
  ssr: false,
});

export default async function ColorPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query;
  const products = await filterProductsByColor(query);

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
            title: "Colores",
            href: ``,
          },
        ]}
      />
      <ProductTable products={products} name="Color" query={query} />
    </>
  );
}

import { filterProductsByBrand } from "@/app/services/brand.service";
// import ProductTable from "@/components/filter/FilterTable";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import dynamic from "next/dynamic";

const ProductTable = dynamic(() => import("@/components/filter/FilterTable"), {
  ssr: false,
});

export default async function BrandPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query;
  const products = await filterProductsByBrand(query);
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
      <ProductTable products={products} name="Marca" query={query} />
    </>
  );
}

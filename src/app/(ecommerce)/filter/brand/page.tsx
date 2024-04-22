import BrandIndex from "@/components/brand/BrandIndex";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

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
      <BrandIndex query={query} name="Marca" />
    </>
  );
}

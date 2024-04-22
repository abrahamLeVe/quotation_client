import FilterIndex from "@/components/filter/FilterIndex";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

export default async function FilterProductPage({
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
            title: "Busqueda en todos los productos",
            href: ``,
          },
        ]}
      />
      <FilterIndex query={query} />
    </>
  );
}

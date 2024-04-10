import CategoryIndex from "@/components/category/CategoryIndex";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

export default async function CategoryPage({
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
            title: `Categorias`,
            href: ``,
          },
        ]}
      />
      <CategoryIndex query={query} name="Categoría" />
    </>
  );
}

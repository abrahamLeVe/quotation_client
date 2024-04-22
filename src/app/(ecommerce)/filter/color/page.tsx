import ColorIndex from "@/components/color/ColorIndex";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

export default async function ColorPage({
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
            title: "Colores",
            href: ``,
          },
        ]}
      />
      <ColorIndex query={query} />
    </>
  );
}

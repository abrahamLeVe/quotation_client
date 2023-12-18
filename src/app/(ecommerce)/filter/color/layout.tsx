import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import ProductSearch from "@/components/ui/Search";

export default function ColorLayout({
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
            title: "Por Color",
            href: `/filter/category`,
          },
        ]}
      />
      <ProductSearch placeholder={"Buscar marca..."} title={"Marca: "} />

      {children}
    </>
  );
}

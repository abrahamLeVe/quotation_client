import { getDataBrand } from "@/app/services/brand.service";
import { getDataCategory } from "@/app/services/category.service";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import background from "../../../../../public/logoAyC.png";

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getDataCategory();
  const brands = await getDataBrand();

  return (
    <>
      <NavBar background={background} brands={brands} categories={categories} />
      <Breadcrumbs
        segments={[
          {
            title: "Inicio",
            href: "/",
          },
          {
            title: "Detalles del producto",
            href: "",
          },
        ]}
      />
      {children}
      <Footer />
    </>
  );
}

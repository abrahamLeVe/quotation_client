import { getDataBrand } from "@/app/services/brand.service";
import { getDataCategory } from "@/app/services/category.service";
import NavBar from "@/components/navbar/NavBar";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import background from "../../../../public/logoAyC.png";
import backgroundMovil from "../../../../public/logoelectrica.jpg";

import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
});

export default async function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getDataCategory();
  const brands = await getDataBrand();

  return (
    <>
      <NavBar
        isCart={true}
        background={background}
        categories={categories}
        brands={brands}
        backgroundMovil={backgroundMovil}
      />
      <main className="flex flex-col md:container m-auto relative">
        <Breadcrumbs
          segments={[
            {
              title: "Inicio",
              href: "/",
            },
            {
              title: "Carrito",
              href: "",
            },
          ]}
        />
        {children}
      </main>
      <Footer />
    </>
  );
}

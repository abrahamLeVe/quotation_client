import { getDataBrand } from "@/app/services/brand.service";
import { getDataCategory } from "@/app/services/category.service";
import NavBar from "@/components/navbar/NavBar";
import background from "../../../../public/logoAyC.png";
import backgroundMovil from "../../../../public/logoelectrica.jpg";

import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
});

export default async function NosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getDataCategory();
  const brands = await getDataBrand();

  return (
    <>
      <NavBar
        background={background}
        brands={brands}
        categories={categories}
        backgroundMovil={backgroundMovil}
      />
      <main className="flex overflow-hidden flex-row container mx-auto gap-5 relative p-3 md:p-5">
        <div className={"w-full min-h-screen flex flex-col gap-3"}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

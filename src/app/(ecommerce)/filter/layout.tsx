import { getDataBrand } from "@/app/services/brand.service";
import { getDataCategory } from "@/app/services/category.service";
import { getDataColor } from "@/app/services/color.service";
import { getDataSizes } from "@/app/services/size.service";
import NavBar from "@/components/navbar/NavBar";
import background from "../../../../public/logoAyC.png";
import { options } from "@/app/api/auth/[...nextauth]/options";

import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
const FilterSlider = dynamic(() => import("@/components/filter/FilterSlider"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
});

export default async function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getDataCategory();
  const brands = await getDataBrand();
  const colors = await getDataColor();
  const sizes = await getDataSizes();
  const session = await getServerSession(options);

  return (
    <>
      <NavBar
        background={background}
        brands={brands}
        categories={categories}
        session={session}
      />
      <main className="flex overflow-hidden flex-row container mx-auto gap-5 relative p-3 md:p-5">
        <FilterSlider
          colors={colors}
          categories={categories}
          brands={brands}
          sizes={sizes}
        />
        <div className={"w-full min-h-screen flex flex-col gap-3"}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

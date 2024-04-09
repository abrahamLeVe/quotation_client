import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import background from "../../../../public/logoAyC.png";
import { getDataCategory } from "@/app/services/category.service";
import { getDataBrand } from "@/app/services/brand.service";

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getDataCategory();
  const brands = await getDataBrand();
  return (
    <>
      <NavBar background={background} brands={brands} categories={categories} />
      <main className="flex flex-col md:container m-auto relative">
        {children}
      </main>
      <Footer />
    </>
  );
}

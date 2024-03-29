import NavBar from "@/components/navbar/NavBar";
import dynamic from "next/dynamic";
import background from "../../../public/logoAyC.png";
import { getDataCategory } from "../services/category.service";

const ProductCarousel = dynamic(
  () => import("@/components/product/ProductCarousel")
);
const Collection = dynamic(() => import("@/components/lobby/Collection"), {
  ssr: false,
});
const LogoSection = dynamic(() => import("@/components/lobby/BrandSection"), {
  ssr: false,
});
const PromoSection = dynamic(() => import("@/components/lobby/PromoSection"), {
  ssr: false,
});
const Testimonials = dynamic(() => import("@/components/lobby/Testimonials"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
});

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getDataCategory();
  return (
    <>
      <NavBar background={background} categories={categories} />
      <main className="flex flex-col md:container mx-auto items-center gap-8">
        {children}
        <ProductCarousel />
        <Collection />
        <LogoSection />
        <PromoSection />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

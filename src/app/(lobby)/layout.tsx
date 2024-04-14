import NavBar from "@/components/navbar/NavBar";
import dynamic from "next/dynamic";
import background from "../../../public/logoAyC.png";
import { getDataBrand } from "../services/brand.service";
import { getDataCategory } from "../services/category.service";
import { getDataProductsNSU } from "../services/product.service";

const ProductCarousel = dynamic(
  () => import("@/components/product/ProductCarousel")
);

const Collection = dynamic(() => import("@/components/lobby/Collection"), {
  ssr: false,
});
const BrandSlider = dynamic(() => import("@/components/brand/BrandSlider"), {
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
const WhatsappButoon = dynamic(
  () => import("@/components/floating/whatsapp-button"),
  {
    ssr: false,
  }
);
const Chat = dynamic(() => import("@/components/chat/Chat"), {
  ssr: false,
});

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getDataCategory();
  const brands = await getDataBrand();

  return (
    <>
      <NavBar background={background} categories={categories} brands={brands} />
      <main className="flex flex-col md:container mx-auto items-center gap-8 relative">
        {children}
        <ProductCarousel />
        <Collection categories={categories} />
        <BrandSlider brands={brands} />
        <PromoSection />
        <Testimonials />
        <div className="fixed right-8 bottom-28">
          <WhatsappButoon />
        </div>
        <div className="fixed right-5 bottom-5">
          <Chat />
        </div>
      </main>
      <Footer />
    </>
  );
}

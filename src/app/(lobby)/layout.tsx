import NavBar from "@/components/navbar/NavBar";
import dynamic from "next/dynamic";
import background from "../../../public/logoAyC.png";
import backgroundMovil from "../../../public/logoelectrica.jpg";

import { getDataBrand } from "../services/brand.service";
import { getDataCategory } from "../services/category.service";
import { getContactData } from "../services/contact.service";
import { getDataProducts } from "../services/product.service";

const ProductSlider = dynamic(
  () => import("@/components/product/ProductSlider"),
  {
    ssr: false,
  }
);
const ChatSliderOver = dynamic(
  () => import("@/components/chat/ChatSliderOver"),
  {
    ssr: false,
  }
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
const Testimonials = dynamic(
  () => import("@/components/lobby/testimonial/Testimonials"),
  { ssr: false }
);
const WhatsappButoon = dynamic(
  () => import("@/components/floating/whatsapp-button"),
  { ssr: false }
);
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
});

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getDataCategory();
  const brands = await getDataBrand();
  const contacts = await getContactData();
  const products = await getDataProducts();

  return (
    <>
      <NavBar
        background={background}
        backgroundMovil={backgroundMovil}
        categories={categories}
        brands={brands}
      />
      <main className="flex flex-col lg:container mx-auto items-center gap-8 relative">
        {children}
        <div className="flex flex-col w-full px-4 justify-center relative">
          <h2 className="text-2xl font-bold tracking-tight pb-5">
            Recién llegados
          </h2>
          <ProductSlider data={products.data} isPage />
        </div>
        <Collection categories={categories} />
        <BrandSlider brands={brands} />
        <PromoSection />
        <Testimonials contacts={contacts} />
        <div className="fixed right-8 bottom-28">
          <WhatsappButoon />
        </div>
        <div className="fixed right-5 bottom-5">
          <ChatSliderOver />
        </div>
      </main>
      <Footer />
    </>
  );
}

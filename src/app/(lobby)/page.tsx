import ProductCarousel from "@/components/product/ProductCarousel";
import Slide from "@/components/slide/Slide";
import { getDataSlide } from "../services/slide.service";
import LogoSection from "@/components/lobby/LogoSection";
import Collection from "@/components/lobby/Collection";
import NewsletterSection from "@/components/lobby/NewsletterSections";
import PromoSection from "@/components/lobby/PromoSection";
import Testimonials from "@/components/lobby/Testimonials";

export default async function HomePage() {
  const { data: slides } = await getDataSlide();

  return (
    <>
      <Slide data={slides} />
      <ProductCarousel />
      <Collection />
      <PromoSection />
      <LogoSection />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}

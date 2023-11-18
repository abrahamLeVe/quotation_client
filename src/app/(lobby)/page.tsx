import ProductCarousel from "@/components/product/ProductCarousel";
import Slide from "@/components/slide/Slide";
import { getDataSlide } from "../services/slide.service";

export default async function HomePage() {
  const { data: slides } = await getDataSlide();

  return (
    <>
      <Slide data={slides} />
      <ProductCarousel />
    </>
  );
}

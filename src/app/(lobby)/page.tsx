import ProductCarousel from "@/components/product/ProductCarousel";
import Slide from "@/components/slide/Slide";
import { getDataProducts } from "../services/product.service";
import { getDataSlide } from "../services/slide.service";

export default async function Home() {
  const { data: slides } = await getDataSlide();

  return (
    <>
      <Slide data={slides} />

      <ProductCarousel />
    </>
  );
}

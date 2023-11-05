import ProductCarousel from "@/components/product/ProductCarousel";
import Slider from "@/components/slider/Slider";
import { getDataNewArrival } from "../services/product.service";
import { getDataSlider } from "../services/slider.service";

export default async function Home() {
  const { data: dataSlider } = await getDataSlider();
  const { data: dataArrival } = await getDataNewArrival();

  return (
    <>
      <Slider data={dataSlider} />
      <ProductCarousel data={dataArrival} />
    </>
  );
}

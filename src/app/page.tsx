import ProductCarousel from "@/components/product/ProductCarousel";
import Slider from "@/components/slider/Slider";
import { getDataNewArrival } from "./services/product.service";
import { getDataSlider } from "./services/slider.service";

export default async function Home() {
  const { data: dataSlider } = await getDataSlider();
  const { data: dataArrival } = await getDataNewArrival();

  return (
    <main className="flex flex-col max-w-screen-xl mx-auto items-center">
      <section className="w-full">
        <Slider data={dataSlider} />
      </section>
      <section className="w-full h-full aspect-[16/7] ">
        <ProductCarousel data={dataArrival} />
      </section>
    </main>
  );
}

import ProductCarousel from "@/components/product/ProductCarousel";
import Slider from "@/components/slider/Slider";
import { NewArrivalInterface } from "@/models/newArrivals.model";
import { SliderInterface } from "@/models/slider.model";
import { fetchDataFromApi } from "@/utilities/api";

async function getDataSlider(): Promise<SliderInterface> {
  const res = fetchDataFromApi(`/api/sliders?populate=*`);
  return res;
}

async function getDataNewArrival(): Promise<NewArrivalInterface> {
  const res = fetchDataFromApi(
    `/api/products?populate=*&[filters][categories][slug][$eq]=new-arrivals`
  );
  return res;
}

export default async function Home() {
  const { data: dataSlider } = await getDataSlider();
  const { data: dataArrival } = await getDataNewArrival();
  return (
    <main className="flex flex-col max-w-screen-xl mx-auto items-center">
      <section className="w-full">
        <Slider data={dataSlider} />
      </section>
      <section className="w-full aspect-[16/7]">
        <ProductCarousel data={dataArrival} />
      </section>
    </main>
  );
}

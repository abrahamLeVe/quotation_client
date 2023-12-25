import Slide from "@/components/slide/Slide";
import { fetchDataFromApi } from "@/lib/api";
import { SlideInterface } from "@/models/slide.model";

async function getDataSlide(): Promise<SlideInterface> {
  const res = await fetchDataFromApi(`/api/sliders?populate=*`);
  return res;
}

export default async function HomePage() {
  const data = await getDataSlide();
  return (
    <>
      <Slide data={data} />
    </>
  );
}

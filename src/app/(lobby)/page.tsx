import Slide from "@/components/slide/Slide";
import { fetchDataFromApi } from "@/lib/api";
import { SlideInterface } from "@/models/slide.model";

const getDataSliders = async (): Promise<SlideInterface> => {
  const res = await fetchDataFromApi(`/api/sliders?populate=*`);
  return res;
};

export default async function HomePage() {
  const data = await getDataSliders();
  return (
    <>
      <Slide data={data} />
    </>
  );
}

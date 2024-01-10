import Slide from "@/components/slide/Slide";
import { fetchDataFromApi } from "@/lib/api";

// async function getDataSlide(): Promise<SlideInterface> {
//   const res = await fetchDataFromApi(`/api/sliders?populate=*`);
//   return res;
// }

export default async function HomePage() {
  const data = await fetchDataFromApi(`/api/sliders?populate=*`);
  return (
    <>
      <Slide data={data} />
    </>
  );
}

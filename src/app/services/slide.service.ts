import { SlideInterface } from "@/models/slide.model";
import { fetchDataFromApi } from "@/lib/api";

export async function getDataSlide(): Promise<SlideInterface> {
  const res = fetchDataFromApi(`/api/sliders?populate=*`);
  return res;
}

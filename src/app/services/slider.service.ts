import { SliderInterface } from "@/models/slider.model";
import { fetchDataFromApi } from "@/lib/api";

export async function getDataSlider(): Promise<SliderInterface> {
  const res = fetchDataFromApi(`/api/sliders?populate=*`);
  return res;
}

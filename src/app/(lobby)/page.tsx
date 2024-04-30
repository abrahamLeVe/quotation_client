import Slide from "@/components/slide/Slide";
import { fetchDataFromApi } from "@/lib/api";
export const revalidate = 360;

export default async function HomePage() {
  const data = await fetchDataFromApi(`/api/sliders?populate=*`);
  return <Slide data={data} />;
}

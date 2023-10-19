import Slider from "@/components/slider/Slider";
import { fetchDataFromApi } from "@/utils/api";

async function getData(): Promise<SliderInterface> {
  const res = fetchDataFromApi(`/api/sliders?populate=*`);
  return res;
}

export default async function Home() {
  const { data } = await getData();

  return (
    <main className="flex w-screen-xl  flex-col items-center ">
      <Slider data={data} />
      <h1>Home page</h1>
    </main>
  );
}

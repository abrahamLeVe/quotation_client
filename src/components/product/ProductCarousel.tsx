import { getDataProducts } from "@/app/services/product.service";
import Carrousel from "../ui/Carrousel";

export default async function ProductCarousel() {
  const { data: products } = await getDataProducts();

  return (
    <div className="flex flex-col w-full h-full px-4 py-5 sm:px-6 lg:px-8 justify-center">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 pb-5">
        Recién llegados
      </h2>
      <div className="w-full relative">
        <Carrousel data={products} />
      </div>
    </div>
  );
}

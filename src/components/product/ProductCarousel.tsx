import { getDataProducts } from "@/app/services/product.service";
import ProductSlider from "./ProductSlider";

export default async function ProductCarousel() {
  const { data: products } = await getDataProducts();

  return (
    <div className="flex flex-col w-full px-4 py-5 justify-center relative">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 pb-5">
        Recién llegados
      </h2>
      <ProductSlider data={products} />
    </div>
  );
}

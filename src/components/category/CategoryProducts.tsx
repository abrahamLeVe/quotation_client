import { filterProductsByCategory } from "@/app/services/category.service";
import ProductSlider from "../product/ProductSlider";
import ProductCarousel from "../product/ProductCarousel";

interface CategoryProductsProps {
  category: string;
}

export default async function CategoryProducts({
  category,
}: CategoryProductsProps) {
  const data = await filterProductsByCategory(category);
  return (
    <div className="flex flex-col w-full px-4 py-5 justify-center relative">
      {!data?.data || data.data.length < 2 ? (
        <ProductCarousel />
      ) : (
        <>
          <h2 className="text-2xl font-bold tracking-tight pb-5">
            Productos relacionados
          </h2>
          <ProductSlider data={data!.data} isPage />
        </>
      )}
    </div>
  );
}

import { filterProductsByCategory } from "@/app/services/category.service";
import ProductSlider from "../product/ProductSlider";
// import ProductCarousel from "../product/ProductCarousel";
import { getDataProducts } from "@/app/services/product.service";

interface CategoryProductsProps {
  category: string;
}

export default async function CategoryProducts({
  category,
}: CategoryProductsProps) {
  const data = await filterProductsByCategory(category);
  const products = await getDataProducts();
  return (
    <div className="flex flex-col w-full py-5 justify-center relative">
      {!data?.data || data.data.length < 2 ? (
        <div className="flex flex-col w-full justify-center relative">
          <h2 className="text-2xl font-bold tracking-tight pb-5">
            Recién llegados
          </h2>
          <ProductSlider data={products.data} isPage />
        </div>
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

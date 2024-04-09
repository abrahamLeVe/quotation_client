"use client";
import ProductSlider from "@/components/product/ProductSlider";
import { Separator } from "@/components/ui/separator";
import { ProductsInterface } from "@/models/products.model";

interface EmptyCartMessageProps {
  score?: number;
  title?: string;
  description?: string;
  isPage?: boolean;
  products?: ProductsInterface;
}

export default function EmptyCartMessage({
  score = 3,
  description,
  title,
  isPage,
  products,
}: EmptyCartMessageProps) {
  const offers = products?.data.filter(
    (product) => product.attributes.rating >= score
  );

  return (
    <div className={`flex flex-col gap-4 ${isPage ? "pb-20" : "py-0"}`}>
      <Separator />
      <h2 className="text-lg font-semibold text-yellow-900 dark:text-white">
        {title || "Tu carrito está vacío."}
      </h2>
      <h3> {description || "¡Explora nuestros productos!"}</h3>
      {products ? (
        <ProductSlider data={offers || []} isPage={isPage} />
      ) : (
        <div className="text-center py-8">
          <a
            href="/filter/category?query=Materiales eléctricos para transformadores"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Explorar Productos
          </a>
        </div>
      )}
    </div>
  );
}

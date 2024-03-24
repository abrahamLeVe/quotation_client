"use client";
import ProductSlider from "@/components/product/ProductSlider";
import { Separator } from "@/components/ui/separator";
import { useCartContext } from "@/context/cart.context";

interface EmptyCartMessageProps {
  score?: number;
  title?: string;
  description?: string;
  isPage?: boolean;
}

export default function EmptyCartMessage({
  score = 3,
  description,
  title,
  isPage,
}: EmptyCartMessageProps) {
  const { products } = useCartContext();
  const offers = products?.data.filter(
    (product) => product.attributes.rating >= score
  );

  return (
    <div className={`grid gap-4 ${isPage ? "pb-20" : "py-0"}`}>
      <Separator />
      <h2 className="text-lg font-semibold text-yellow-900 dark:text-white">
        {title || "Sin productos en el carrito"}
      </h2>
      <h3> {description || "¡Descubre nuestras ofertas!"}</h3>
      <div>
        <ProductSlider data={offers || []} isPage={isPage} />
      </div>
    </div>
  );
}

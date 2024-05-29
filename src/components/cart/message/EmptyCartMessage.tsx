"use client";
import ProductSlider from "@/components/product/ProductSlider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductsInterface } from "@/models/products.model";
import Link from "next/link";

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
    <div
      className={`flex flex-col gap-4 ${isPage ? "pb-20" : "py-0"} relative`}
    >
      <Separator />
      <h2 className="text-lg font-semibold text-yellow-900 dark:text-white">
        {title || "Tu carrito está vacío."}
      </h2>
      <h3> {description || "¡Explora nuestros productos!"}</h3>
      {products ? (
        <ProductSlider data={offers || []} isPage={isPage} />
      ) : (
        <div className="text-center py-8">
          <Button variant={"link"}>
            Explorar Productos
            <Link
              href="/filter/category?query=Galería%20de%20productos"
              className="absolute inset-0"
            ></Link>
          </Button>
        </div>
      )}
    </div>
  );
}

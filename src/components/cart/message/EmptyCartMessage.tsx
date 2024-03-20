import { useCartContext } from "@/context/cart.context";
import ProductCard from "@/components/product/ProductCard";

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
    <div className="grid gap-4 py-4">
      <h2 className="text-lg font-semibold text-yellow-900 dark:text-white">
        {title || "Vacío"}
      </h2>
      <h3> {description || "¡Descubre nuestras ofertas!"}</h3>
      <div
        className={`grid ${
          isPage ? "md:grid-cols-4" : "sm:grid-cols-2"
        } grid-cols-1 gap-4`}
      >
        {offers?.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

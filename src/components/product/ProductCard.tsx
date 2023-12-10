"use client";
import { useProductContext } from "@/context/product.context";
import { ProductInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { BsEye } from "react-icons/bs";
import { CartButtonAction } from "../cart/CartButtonAction";
import ImageGalleryIndex from "../ui/ImageGallery";
import ProductDetail from "./ProductDetail";

export default function ProductCard({
  product,
}: {
  product: ProductInterface;
}) {
  const cart = cartStore((state) => state);
  const { setProduct, setIsOpen } = useProductContext();

  return (
    <>
      <div className="flex flex-col">
        <div className="aspect-1 bg-gray-200 ">
          <ImageGalleryIndex product={product} />
        </div>
        <div className="flex flex-col p-2 gap-2">
          {/* Details */}
          <ProductDetail product={product} />
          <CartButtonAction
            onClick={() => {
              setProduct([product]), setIsOpen(true);
            }}
            title="Detalles"
            icon={<BsEye />}
          />
        </div>
      </div>
    </>
  );
}

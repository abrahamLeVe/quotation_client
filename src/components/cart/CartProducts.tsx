"use client";
import { cartStore } from "@/store/cart.store";
import dynamic from "next/dynamic";
import CartProduct from "./CartProduct";
import LoadingCart from "./loading";
const EmptyCartMessage = dynamic(() => import("./message/EmptyCartMessage"), {
  ssr: false,
  loading: () => <LoadingCart />,
});
interface CartProductsProps {
  isPage?: boolean;
}

export default function CartProducts({ isPage }: CartProductsProps) {
  const cart = cartStore((state) => state.cartItemState);

  return (
    <div className={`mt-8 w-full pb-0 ${isPage && " lg:pb-20"}`}>
      <div className="flow-root">
        <div className="-my-6 divide-y divide-gray-200 w-full">
          {cart?.length > 0 ? (
            <>
              <div className="text-lg font-medium ">Productos a cotizar</div>
              {cart.map((product) => {
                return (
                  <div key={product.id}>
                    <CartProduct product={product} isPage={isPage} />
                  </div>
                );
              })}
            </>
          ) : (
            <EmptyCartMessage score={3} isPage={true} />
          )}
        </div>
      </div>
    </div>
  );
}

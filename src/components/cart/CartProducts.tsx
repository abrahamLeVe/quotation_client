"use client";
import { cartStore } from "@/store/cart.store";
import CartProduct from "./CartProduct";
import EmptyCartMessage from "./message/EmptyCartMessage";

export default function CartProducts() {
  const cart = cartStore((state) => state.cartItemState);

  return (
    <div className="mt-8 w-full">
      <div className="flow-root">
        <div className="-my-6 divide-y divide-gray-200 w-full">
          {cart?.length > 0 ? (
            cart.map((product) => {
              return (
                <div key={product.id}>
                  <CartProduct product={product} />
                </div>
              );
            })
          ) : (
            <EmptyCartMessage score={3} isPage={true} />
          )}
        </div>
      </div>
    </div>
  );
}

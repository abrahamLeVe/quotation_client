"use client";
import { useCartContext } from "@/context/cart.context";
import { cartStore } from "@/store/cart.store";
import { formatCurrency, truncate } from "@/utilities/utils";
import { useState } from "react";
import ColorSelect from "../color/ColorSelect";
import ProductModal from "../product/ProductModal";
import ProductPrice from "../product/ProductPrice";
import CartButtonActions from "./CartButtonActions";

interface CartItemProps {
  isPage?: boolean;
}

export default function CartItem({ isPage = false }: CartItemProps) {
  const { cartItems } = useCartContext();
  const cart = cartStore((state) => state);
  const [idColor, setIdColor] = useState<number | undefined>();

  return (
    <div className="mt-8 w-full">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200 w-full">
          {cart.cartItemState.map((cartItem) => {
            const product = cartItems.find((p) =>
              p.attributes.prices.data.some((price) => price.id === cartItem.id)
            );

            if (!product) {
              return null;
            }

            const selectedPrice = product.attributes.prices.data.find(
              (price) => price.id === cartItem.id
            );
            const colors = selectedPrice!.attributes.product_colors.data;

            const handleColorChange = (id: string) => {
              const colorId = parseInt(id);
              const selectedColor = colors.find(
                (price) => price.id === colorId
              );
              setIdColor(selectedColor?.id);
            };

            const size = selectedPrice?.attributes.size.data;

            return (
              <li
                className="flex py-6 items-center relative"
                key={selectedPrice?.id}
              >
                <div
                  className="h-24 w-24 overflow-hidden flex-shrink-0 rounded-md border border-gray-200 relative"
                  title="Detalles"
                >
                  <ProductModal product={product} isCart />
                  <img
                    src={
                      product.attributes.thumbnail.data?.attributes.formats
                        .thumbnail.url
                    }
                    alt={product.attributes.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col gap-3">
                  <div>
                    <h3 className="p-0" title={product.attributes.name}>
                      {isPage ? (
                        <>{product.attributes.name}</>
                      ) : (
                        <>{truncate(product.attributes.name, 28)}</>
                      )}
                    </h3>
                    <div className="flex flex-row gap-3">
                      <ProductPrice
                        discount={selectedPrice?.attributes.discount!}
                        price={selectedPrice?.attributes.value!}
                        popUp
                      />
                    </div>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <div className="flex flex-col">
                      {size ? (
                        <div className="flex gap-1">
                          <h3 className="font-medium">Medida:{""}</h3>
                          <p>
                            {size.attributes.numberLatam}-
                            {size.attributes.category.data.attributes.name}
                          </p>
                        </div>
                      ) : null}
                      <div className="flex flex-row max-w-[250px]">
                        {colors.length > 0 ? (
                          <ColorSelect
                            colors={colors}
                            key={selectedPrice!.id}
                            handleColorChange={handleColorChange}
                            productId={selectedPrice!.id}
                          />
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 relative">
                      {isPage ? (
                        <div className="flex flex-row  gap-1">
                          <div>
                            <h3 className="font-medium">Sub total:</h3>
                          </div>
                          <div>
                            {formatCurrency(
                              (selectedPrice?.attributes.value! -
                                selectedPrice?.attributes.discount!) *
                                cartItem.quantity
                            )}
                          </div>
                        </div>
                      ) : null}
                      <CartButtonActions
                        id={selectedPrice!.id}
                        idColor={idColor || colors[0]?.id}
                      />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

"use client";
import { useCartContext } from "@/context/cart.context";
import { cartStore } from "@/store/cart.store";
import { truncate } from "@/utilities/utils";
import { useRouter } from "next/navigation";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import ProductPrice from "../product/ProductPrice";
import { CartButtonAction } from "./CartButtonAction";

export default function CartItem() {
  const cart = cartStore((state) => state);
  const { getItemQuantity, setOpenCart, cartItems } = useCartContext();
  const router = useRouter();
  console.log(cartItems);
  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cartItems.map((product) => (
            <li className="flex py-6 relative" key={product.id}>
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={
                    product.attributes.thumbnail.data?.attributes.formats
                      .thumbnail.url
                  }
                  alt={product.attributes.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col gap-5">
                <div>
                  <div className="flex text-base  hover:underline font-medium text-gray-900 relative">
                    <h3 title={product.attributes.name}>
                      {truncate(product.attributes.name, 70)}
                      <button
                        onClick={() => {
                          router.push(`/product/${product.attributes.slug}`);
                          setOpenCart(false);
                        }}
                        className="absolute inset-0"
                      ></button>
                    </h3>
                  </div>
                  <div className="flex flex-row gap-5">
                    <ProductPrice
                      discount={product.attributes.discount}
                      price={product.attributes.price}
                    />
                    <p>x{getItemQuantity(product.id)}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-end text-sm gap-3">
                  <div title="Eliminar">
                    <CartButtonAction
                      onClick={() => {
                        cart.removeCartItem(product.id);
                        cart.cartItemState[0].id === product.id &&
                          cart.cartItemState.length === 1 &&
                          setOpenCart(false);
                      }}
                      icon={<MdDeleteOutline />}
                      className="max-w-[42px]"
                    />
                  </div>
                  {getItemQuantity(product.id) > 1 && (
                    <div title="Restar">
                      <CartButtonAction
                        onClick={() => {
                          cart.decreaseCartQuantity(product.id);
                        }}
                        icon={<BsCartDash />}
                        className="max-w-[42px]"
                      />
                    </div>
                  )}
                  <div title="Aumentar">
                    <CartButtonAction
                      onClick={() => cart.increaseCartQuantity(product.id)}
                      icon={<BsCartPlus />}
                      className="max-w-[42px]"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

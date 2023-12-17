"use client";
import { useCartContext } from "@/context/cart.context";
import { cartStore } from "@/store/cart.store";
import { truncate } from "@/utilities/utils";
import { useRouter } from "next/navigation";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import ProductPrice from "../product/ProductPrice";
import { Button } from "../ui/button";

export default function CartItem() {
  const cart = cartStore((state) => state);
  const { getItemQuantity, setOpenCart, cartItems } = useCartContext();
  const router = useRouter();
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

              <div className="ml-4 flex flex-1 flex-col gap-3">
                <div>
                  <Button
                    onClick={() => {
                      router.push(`/product/${product.attributes.slug}`);
                      setOpenCart(false);
                    }}
                    variant={"link"}
                    className="p-0"
                    title={product.attributes.name}
                  >
                    {truncate(product.attributes.name, 30)}
                  </Button>
                  <div className="flex flex-row gap-3">
                    <ProductPrice
                      discount={
                        product.attributes.prices.data[0]?.attributes.discount!
                      }
                      price={
                        product.attributes.prices.data[0]?.attributes.value
                      }
                      popUp
                    />

                    <p>x{getItemQuantity(product.id)}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-end text-sm gap-3">
                  <Button
                    onClick={() => {
                      cart.removeCartItem(product.id);
                      cart.cartItemState[0].id === product.id &&
                        cart.cartItemState.length === 1 &&
                        setOpenCart(false);
                    }}
                    title="Eliminar del carrito"
                  >
                    <MdDeleteOutline className="h-6 w-6" />
                  </Button>

                  {getItemQuantity(product.id) > 1 && (
                    <Button
                      onClick={() => {
                        cart.decreaseCartQuantity(product.id);
                      }}
                      title="Restar"
                    >
                      <BsCartDash className="h-6 w-6" />
                    </Button>
                  )}
                  <Button
                    onClick={() => cart.increaseCartQuantity(product.id)}
                    title="Añadir"
                  >
                    <BsCartPlus className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

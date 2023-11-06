"use client";
import { useCart } from "@/context/cartModal";
import { useSpeechRecognition } from "@/hooks/useSpeech";
import { cartStore } from "@/store/cart.store";
import { truncate } from "@/utilities/utils";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { CartButton } from "../product/ProductCarousel";
import ProductPrice from "../product/ProductPrice";

export default function ResultSpeech() {
  const cart = cartStore((state) => state);
  const { filterProduct } = useSpeechRecognition();
  const { getItemQuantity, setOpenCart } = useCart();
  console.log(filterProduct);
  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {filterProduct.map((product) => (
            <li className="flex py-6 relative" key={product.id}>
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={
                    product.attributes.thumbnail.data.attributes.formats
                      .thumbnail.url
                  }
                  alt={product.attributes.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col gap-5">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3 title={product.attributes.name}>
                      <a href={"#"} className="hover:underline">
                        <p>{truncate(product.attributes.name, 70)}</p>
                      </a>
                    </h3>
                  </div>
                  <div className="flex flex-row gap-5">
                    <ProductPrice
                      discount={product.attributes.discount}
                      price={product.attributes.price}
                    />
                    {getItemQuantity(product.id) > 0 && (
                      <p>x{getItemQuantity(product.id)}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-end text-sm gap-3">
                  <div title="Eliminar">
                    <CartButton
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
                      <CartButton
                        onClick={() => {
                          cart.decreaseCartQuantity(product.id);
                        }}
                        icon={<BsCartDash />}
                        className="max-w-[42px]"
                      />
                    </div>
                  )}
                  <div title="Aumentar">
                    <CartButton
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

"use client";
import { useCart } from "@/context/cartModal";
import { useProduct } from "@/context/productModal";
import { useSpeechFilter } from "@/context/speechFilter";
import { cartStore } from "@/store/cart.store";
import { truncate } from "@/utilities/utils";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { CartButton } from "../product/ProductCarousel";
import ProductPrice from "../product/ProductPrice";
import ProductRating from "../product/ProductRating";
import FilterSection from "./FilterSection";
import FilterSliderOver from "./FilterSliderOver";

export default function ResultSpeech() {
  const cart = cartStore((state) => state);
  const { products, query } = useSpeechFilter();
  const { getItemQuantity } = useCart();
  const { getProduct, cleanProductModal } = useProduct();

  console.log(products);
  return (
    <div className="flex w-full min-h-screen px-5">
      <div className="hidden lg:block">
        <FilterSection />
      </div>

      <div className="flex flex-col w-full h-[80vh] overflow-hidden">
        <div className="sticky top-0 flex-wrap w-full p-5 z-10 backdrop-blur-lg">
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-3 ">
              <h2>RESULTADOS:</h2>
              {query.map((item, index) => (
                <h3 key={item + index}>{item}</h3>
              ))}
            </div>
            <div>
              <FilterSliderOver />
            </div>
          </div>
        </div>
        <ul className="flex-1 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 -my-6 divide-y divide-gray-200">
          {products.map((product) => (
            <li className="flex py-6 relative gap-5" key={product.id}>
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                <img
                  src={
                    product.attributes.thumbnail.data.attributes.formats
                      .thumbnail.url
                  }
                  alt={product.attributes.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="flex flex-1 flex-col gap-5">
                <div className="flex flex-col justify-between gap-1">
                  <div className="font-medium text-gray-900">
                    <h3 title={product.attributes.name}>
                      <a href={"#"} className="hover:underline">
                        <p>{truncate(product.attributes.name, 110)}</p>
                      </a>
                    </h3>
                  </div>
                  <div className="flex flex-row flex-wrap gap-5">
                    <ProductRating rating={product!.attributes.rating} />
                    <ProductPrice
                      discount={product.attributes.discount}
                      price={product.attributes.price}
                    />
                    {getItemQuantity(product.id) > 0 && (
                      <p>x{getItemQuantity(product.id)}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div
                    className="flex flex-1 items-end justify-end text-sm gap-3"
                    onClick={cleanProductModal}
                  >
                    {getItemQuantity(product.id) > 0 && (
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
                  <div title="Ver detalles overflow-hidden">
                    <CartButton
                      onClick={() => {
                        getProduct(product.id);
                      }}
                      icon={<FaEye />}
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

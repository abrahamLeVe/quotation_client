"use client";
import { useCart } from "@/context/cartModal";
import { useProduct } from "@/context/productModal";
import { NewArrivalInterface } from "@/models/newArrivals.model";
import { cartStore } from "@/store/cart.store";
import productStorage from "@/store/product.store";
import { truncate } from "@/utilities/utils";
import { useEffect } from "react";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

export default function ProductCarousel(data: NewArrivalInterface) {
  const addProductToStore = productStorage((state) => state.addProduct);
  const cart = cartStore((state) => state);
  const { getItemQuantity } = useCart();
  const { getProduct, cleanModal } = useProduct();
  const { data: products } = data;

  useEffect(() => {
    addProductToStore(data);
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <div className="flex flex-col h-full px-4 py-5 sm:px-6 lg:px-8 justify-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 pb-5">
          New Arrivals
        </h2>
        <Carousel
          responsive={responsive}
          containerClass="-mx-[10px]"
          itemClass="px-[10px]"
          draggable={false}
          autoPlay={false}
          infinite
          className="z-30 py-3"
        >
          {products.map((product) => (
            <div
              className="flex flex-col border rounded-lg h-full w-full relative"
              key={product.id}
            >
              <div className="aspect-h-1 aspect-w-1">
                <img
                  src={product.attributes.thumbnail.data.attributes.url}
                  alt={product.attributes.name}
                  className="rounded-t-lg"
                />
              </div>
              <div className="flex flex-col text-sm rounded-b-lg p-3 bg-white h-full justify-between gap-3">
                <div className="flex flex-col gap-3">
                  <p title={product.attributes.name}>
                    {truncate(product.attributes.name, 70)}
                  </p>

                  <ProductRating rating={product.attributes.rating} />
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
                <div title="Ver detalles">
                  <CartButton
                    onClick={() => getProduct(product.id)}
                    icon={<FaEye />}
                    className="absolute top-0 end-0 max-w-[42px]"
                  />
                </div>
                <div
                  className="flex flex-wrap justify-end gap-3"
                  onClick={cleanModal}
                >
                  {getItemQuantity(product.id) > 0 ? (
                    <>
                      <CartButton
                        onClick={() => cart.removeCartItem(product.id)}
                        title="Eliminar"
                        icon={<MdDeleteOutline />}
                      />
                      <CartButton
                        onClick={() => cart.decreaseCartQuantity(product.id)}
                        title="Quitar"
                        icon={<BsCartDash />}
                      />
                      <CartButton
                        onClick={() => cart.increaseCartQuantity(product.id)}
                        title="Añadir"
                        icon={<BsCartPlus />}
                      />
                    </>
                  ) : (
                    <>
                      <CartButton
                        onClick={() => cart.increaseCartQuantity(product.id)}
                        title="Añadir"
                        icon={<BsCartPlus />}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

interface CartButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  title?: string;
  icon: React.ReactNode;
}

export function CartButton({
  onClick,
  title,
  icon,
  className,
}: CartButtonProps) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <button
      className={classNames(
        "flex flex-wrap w-[110px] border rounded-lg p-2 hover:bg-gray-200 transition-all items-center justify-center gap-2",
        className as string
      )}
      onClick={onClick}
      title={title}
    >
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
      <span className={`${!title && "hidden"}`}>{title}</span>
    </button>
  );
}

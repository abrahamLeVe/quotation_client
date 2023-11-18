"use client";

import { useProductContext } from "@/context/product.context";
import { ProductInterface } from "@/models/product.model";
import { cartStore } from "@/store/cart.store";
import { truncate } from "@/utilities/utils";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";
import { useMounted } from "@/hooks/useMounted";

export default function ProductCard({
  product,
}: {
  product: ProductInterface;
}) {
  const cart = cartStore((state) => state);
  const { getItemQuantity, getProduct, cleanProductModal } = useProductContext();
  const mounted = useMounted();

  return (
    <div className="w-72 border-8 border-transparent">
      <div className="flex flex-col border rounded-lg h-full w-full relative">
        <div className="aspect-h-1 aspect-w-1 bg-gray-100">
          <img
            src={product.attributes.thumbnail.data?.attributes.url}
            alt={product.attributes.name}
            className="rounded-t-lg"
          />
        </div>
        <div className="flex flex-col text-sm rounded-b-lg p-3 bg-white h-full gap-3">
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
              {getItemQuantity(product.id) > 0 && mounted && (
                <p>x{getItemQuantity(product.id)}</p>
              )}
            </div>
          </div>
          <div title="Ver detalles">
            <CartButton
              onClick={() => getProduct(product.id)}
              icon={<FaEye />}
              className="absolute top-0 end-0 max-w-[42px] backdrop-blur-md"
            />
          </div>

          <div
            className="flex flex-wrap justify-end gap-3"
            onClick={cleanProductModal}
          >
            {mounted && (
              <>
                {getItemQuantity(product.id) > 0 && (
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
                  </>
                )}
              </>
            )}
            <CartButton
              onClick={() => cart.increaseCartQuantity(product.id)}
              title="Añadir"
              icon={<BsCartPlus />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface CartButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  title?: string;
  icon?: React.ReactNode;
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
    <>
      <button
        className={classNames(
          "flex flex-wrap w-[110px] border rounded-lg p-1.5 text-gray-400 hover:text-gray-500 transition-all items-center justify-center gap-2 ",
          className as string
        )}
        onClick={onClick}
        title={title}
      >
        <span className="text-2xl" aria-hidden="true">
          {icon}
        </span>
        <p className={`${!title && "hidden"} text-sm text-gray-900`}>{title}</p>
      </button>
    </>
  );
}

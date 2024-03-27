"use client";
import { truncate } from "@/lib/utils";
import { Color, ProductCart } from "@/models/cart.model";
import Link from "next/link";
import { useState } from "react";
import { GrEdit } from "react-icons/gr";
import SelectColorCart from "../select/SelectColorCart";
import { Button } from "../ui/button";
import CartButtonActions from "./CartButtonActions";
interface CartProductProps {
  product: ProductCart;
  isPage?: boolean;
}

export default function CartProduct({ product, isPage }: CartProductProps) {
  const [color, setColor] = useState<Color | undefined>(
    product.colors?.length === 1 ? product.colors[0].color : undefined
  );
  const [idColor, setIdColor] = useState<number | undefined>(
    product.colors?.length === 1 ? product.colors[0].color?.id : undefined
  );

  if (!product) return null;

  const handleColorChange = (id: string) => {
    const selectedColor = product.colors?.find(
      (price) => price.id === parseInt(id)
    );
    setIdColor(undefined);
    setColor(undefined);
    if (selectedColor?.quantity === 0 && product.colors?.length === 1) {
      return;
    } else {
      setIdColor(selectedColor?.color?.id);
      setColor(selectedColor?.color);
    }
  };

  function onClick() {
    const selectedColor = product.colors?.find((price) => price.id === idColor);
    setIdColor(undefined);
    setColor(undefined);
    if (selectedColor?.quantity! === 0 && product.colors?.length != 1) {
      return;
    } else {
      setIdColor(selectedColor?.color?.id);
      setColor(selectedColor?.color);
    }
  }
  const size = product.size;

  return (
    <div className="flex py-6 items-center relative">
      <div
        className="h-24 w-24 overflow-hidden flex-shrink-0 rounded-md border border-gray-200 relative"
        title="Detalles"
      >
        <Button
          className={
            "absolute bg-white/20 bg-opacity-80 backdrop-filter backdrop-blur-md text-gray-900 "
          }
          title="Editar"
        >
          <GrEdit className="h-[1.2rem] w-[1.2rem]" />
          <Link
            prefetch={true}
            href={`/product/` + product.slug}
            className="absolute inset-0"
            scroll={false}
          ></Link>
        </Button>
        <img
          src={product.picture_url}
          alt={product.title!}
          className="aspect-square w-full object-cover object-center"
          loading="lazy"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col gap-3">
        <div>
          <h3 className="p-0" title={product.title!}>
            {isPage ? (
              <>{product.title!}</>
            ) : (
              <>{truncate(product.title!, 55)}</>
            )}
          </h3>
        </div>
        <div className="flex gap-1 flex-col">
          <div className="flex flex-col gap-1">
            {size ? (
              <div className="flex gap-1">
                <h3 className="font-medium">Medida:{""}</h3>
                <div className="flex">{`${size}`}</div>
              </div>
            ) : null}
            <div className="flex flex-col gap-2 ">
              {product.colors?.length! > 0 ? (
                <>
                  <SelectColorCart
                    colors={product.colors!}
                    handleColorChange={handleColorChange}
                    productId={product.id}
                    key={product.id}
                  />
                  <div
                    className="flex flex-col items-end gap-3 relative"
                    onClick={() => onClick()}
                  >
                    <CartButtonActions
                      priceId={product.id}
                      idColor={
                        product.colors?.length! === 1
                          ? product.colors![0].color?.id!
                          : color?.id!
                      }
                      colors={product.colors?.length}
                      color={
                        product.colors?.length! === 1
                          ? product.colors![0].color
                          : color
                      }
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-end gap-3 relative">
                  <CartButtonActions priceId={product.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

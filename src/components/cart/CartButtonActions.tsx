"use client";
import { useProductContext } from "@/context/product.context";
import { ColorProduct } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { BsCartCheck, BsCartDash, BsCartPlus } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

interface CartButtonActionsProps {
  priceId: number;
  idColor?: number;
  isPage?: boolean;
  colors?: number;
  color?: ColorProduct;
  size?: string;
  picture_url?: string;
  title?: string;
  slug?: string;
}

export default function CartButtonActions({
  priceId,
  idColor,
  isPage = false,
  colors,
  color,
  size,
  picture_url,
  title,
  slug,
}: CartButtonActionsProps) {
  const cart = cartStore((state) => state);
  const { getItemQuantity, getItemColorQuantity } = useProductContext();
  const addToCart = () => {
    if (colors! > 0 && !idColor) {
      return toast({
        variant: "destructive",
        title: "Color",
        description: "Por favor seleccione un color.",
      });
    } else {
      cart.increaseCartQuantity(
        priceId,
        idColor!,
        color,
        size,
        picture_url,
        title,
        slug
      );
    }
  };

  const decreaseToCart = () => {
    if (!getItemColorQuantity(priceId, idColor!) && colors! > 0) {
      return toast({
        variant: "destructive",
        title: "Color",
        description: "Por favor seleccione un color que esté en el carrito.",
      });
    } else {
      cart.decreaseCartQuantity(priceId, idColor!);
    }
  };

  return (
    <>
      {getItemQuantity(priceId) ? (
        <div className="flex flex-wrap justify-end flex-row gap-2">
          <Button
            onClick={() => {
              cart.removeCartItem(priceId);
            }}
            title="Quitar del carrito"
          >
            <MdDeleteOutline className="h-[1.2rem] w-[1.2rem]" />
            {isPage ? "Quitar" : null}
          </Button>

          {!getItemQuantity(priceId) ? null : getItemQuantity(priceId)! <
            2 ? null : (
            <Button onClick={decreaseToCart} title="Restar">
              <BsCartDash className="h-[1.2rem] w-[1.2rem]" />
              {isPage ? "Restar" : null}
            </Button>
          )}

          <Button onClick={addToCart} title="Añadir">
            <BsCartCheck className="h-[1.2rem] w-[1.2rem]" />
            {`x ${getItemQuantity(priceId)}`}
          </Button>
        </div>
      ) : (
        <Button onClick={addToCart} title="Añadir">
          <BsCartPlus className="h-[1.2rem] w-[1.2rem]" /> Añadir
        </Button>
      )}
    </>
  );
}

"use client";
import { useCartContext } from "@/context/cart.context";
import { useProductContext } from "@/context/product.context";
import { cartStore } from "@/store/cart.store";
import { BsCartCheck, BsCartDash, BsCartPlus } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "../ui/button";

interface CartButtonActionsProps {
  id: number;
  idColor: number;
  isPage?: boolean;
}

export default function CartButtonActions({
  id,
  idColor,
  isPage = false,
}: CartButtonActionsProps) {
  const cart = cartStore((state) => state);
  const { setOpenCart } = useCartContext();
  const { getItemQuantity } = useProductContext();

  return (
    <>
      {getItemQuantity(id) ? (
        <div className="flex flex-wrap flex-row gap-2">
          <Button
            onClick={() => {
              cart.removeCartItem(id);
              cart.cartItemState.length === 1 && setOpenCart(false);
            }}
            title="Quitar del carrito"
          >
            <MdDeleteOutline className="h-6 w-6" />
            {isPage ? "Quitar" : null}
          </Button>

          {!getItemQuantity(id) ? null : getItemQuantity(id)! < 2 ? null : (
            <Button
              onClick={() => cart.decreaseCartQuantity(id, idColor)}
              title="Restar"
            >
              <BsCartDash className="h-6 w-6" /> {isPage ? "Restar" : null}
            </Button>
          )}

          <Button
            onClick={() => cart.increaseCartQuantity(id, idColor)}
            title="Añadir"
          >
            <BsCartCheck className="h-6 w-6" />
            {`x ${getItemQuantity(id)}`}
          </Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => cart.increaseCartQuantity(id, idColor)}
            title="Añadir"
          >
            <BsCartPlus className="h-6 w-6" /> Añadir
          </Button>
        </div>
      )}
    </>
  );
}

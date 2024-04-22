"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartContext } from "@/context/cart.context";
import dynamic from "next/dynamic";
import { FaShoppingCart } from "react-icons/fa";
import { Icons } from "../Icons";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import CartProducts from "./CartProducts";

const CartCheckout = dynamic(() => import("./CartCheckout"), {
  ssr: false,
});
const EmptyCartMessage = dynamic(() => import("./message/EmptyCartMessage"), {
  ssr: false,
});

export default function CartSliderOver() {
  const { cartQuantity, isLoading } = useCartContext();

  return (
    <Sheet>
      <SheetTrigger asChild className="z-40">
        <Button
          variant="ghost"
          className="relative"
          disabled={cartQuantity === 0 || isLoading}
          title="Carrito de compras"
        >
          <FaShoppingCart className="h-[1.2rem] w-[1.2rem]" />
          {isLoading ? (
            <Icons.spinner
              className="border rounded-full h-[1.2rem] w-[1.2rem] absolute top-0 right-0 animate-spin"
              aria-hidden="true"
            />
          ) : (
            <Badge className="absolute top-0 right-0" variant={"outline"}>
              {cartQuantity}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <ScrollArea className="h-full pr-3">
          <SheetHeader>
            <SheetTitle>Carrito</SheetTitle>
          </SheetHeader>
          {!cartQuantity ? (
            <EmptyCartMessage score={3} isPage={false} />
          ) : (
            <>
              <div className="grid gap-4 py-2 pb-24">
                <CartProducts isPage={false} />
                <SheetFooter className="fixed bottom-0 backdrop-blur-md ">
                  <SheetClose asChild>
                    <CartCheckout />
                  </SheetClose>
                </SheetFooter>
              </div>
            </>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

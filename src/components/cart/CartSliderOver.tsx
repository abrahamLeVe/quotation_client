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
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Icons } from "../Icons";
import { ScrollArea } from "../ui/scroll-area";
import CartCheckout from "./CartCheckout";
import CartItem from "./CartItem";
import { Badge } from "../ui/badge";

export default function CartSliderOver() {
  const { cartQuantity, isLoading } = useCartContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="link"
          className="relative"
          disabled={cartQuantity === 0 || isLoading}
          role="link"
          title="Carrito de compras"
        >
          <HiOutlineShoppingBag className="h-7 w-7" />
          {isLoading ? (
            <Icons.spinner
              className="border rounded-full w-6 h-6 absolute top-0 right-0 animate-spin"
              aria-hidden="true"
            />
          ) : (
            <Badge className="absolute top-0 right-0" variant={"outline"}>
              {cartQuantity}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <ScrollArea className="h-full pr-3">
          <SheetHeader>
            <SheetTitle>Carrito</SheetTitle>
          </SheetHeader>
          {!cartQuantity ? (
            <div className="grid gap-4 py-4">Carrito vacio</div>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <CartItem />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <CartCheckout />
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

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
import CartCheckout from "./CartCheckout";
import CartItem from "./CartItem";
import { ScrollArea } from "../ui/scroll-area";

export default function CartSliderOver() {
  const { cartQuantity } = useCartContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="relative">
          <HiOutlineShoppingBag
            className="h-7 w-7 flex-shrink-0"
            aria-hidden="true"
          />
          <div className="border rounded-full w-6 h-6 absolute top-0 right-0">
            <p className="text-sm">{cartQuantity}</p>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <ScrollArea className="h-full pr-3">         
          <SheetHeader>
            <SheetTitle>Carrito</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <CartItem />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <CartCheckout />
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

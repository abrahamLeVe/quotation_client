"use client";
import { payMercadoPago } from "@/app/services/mp.service";
import { useCartContext } from "@/context/cart.context";
import { cartStore } from "@/store/cart.store";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { SheetClose } from "../ui/sheet";

export default function PaymentMP() {
  const { cartItems } = useCartContext();
  const cart = cartStore((state) => state.cartItemState);
  const { setTheme } = useTheme();

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_KEY!, { locale: "es-PE" });
  }, []);

  async function onSubmit() {
    const preferenceId = await payMercadoPago({ cart, cartItems });
    setTheme("light");
    return preferenceId;
  }

  return (
    <div>
      <SheetClose>
        <Wallet
          initialization={{
            redirectMode: "modal",
          }}
          customization={{}}
          onSubmit={onSubmit}
        />
      </SheetClose>
    </div>
  );
}

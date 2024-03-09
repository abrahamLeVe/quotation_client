"use client";
import { createQuotation } from "@/app/services/quotation.service";
import { useCartContext } from "@/context/cart.context";
import { cartStore } from "@/store/cart.store";
import { Button } from "../ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Icons } from "../Icons";
import { toast } from "../ui/use-toast";

export default function QuotationSend() {
  const { cartItems } = useCartContext();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const cart = cartStore((state) => state.cartItemState);
  const email = session?.user.email;

  async function onClick() {
    setLoading(true);
    const res = await createQuotation({ cart, cartItems, email });
    setLoading(false);
    if (res.data === null) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `${res.error.message}`,
      });
    } else {
      toast({
        variant: "default",
        title: "éxito",
        description: "Cotización enviada con éxito",
      });
    }
  }

  return (
    <div>
      <Button disabled={loading} onClick={onClick}>
        {loading && (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        Enviar cotización
        <span className="sr-only">Enviar cotización</span>
      </Button>
    </div>
  );
}

"use client";
import { createQuotation } from "@/app/services/quotation.service";
import { useCartContext } from "@/context/cart.context";
import { handleErrorMessage } from "@/lib/exceptions";
import { cartStore } from "@/store/cart.store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export default function QuotationSend() {
  const [loading, setLoading] = useState(false);
  const cart = cartStore((state) => state.clearCart);
  const router = useRouter();
  const { productsInCar, setIsLoading, isLoading } = useCartContext();
  const { data: session } = useSession();

  const onClick = async () => {
    setLoading(true);
    const email = session?.user.email;
    const token = session?.user.accessToken;
    const id = session?.user.userId;
    const products = productsInCar();

    const res = await createQuotation({ products, token, email, id });

    if (res.data === null && res.error) {
      const errorMessage = handleErrorMessage(res.error);
      toast({
        variant: "destructive",
        title: errorMessage,
        description: (
          <>
            <span className="underline">
              <Link href={"/auth/signin"}>Click Aquí</Link>
            </span>
          </>
        ),
      });
      setLoading(false);
    } else {
      toast({
        variant: "default",
        title: "Éxito",
        description: "Cotización enviada con éxito",
      });
      // router.push("/dashboard/order");
      // router.refresh();
      // cart();
    }
  };

  return (
    <div>
      <Button disabled={isLoading} onClick={onClick}>
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

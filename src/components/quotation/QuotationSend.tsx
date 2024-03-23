"use client";
import { createQuotation } from "@/app/services/quotation.service";
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
  const products = cartStore((state) => state.cartItemState);

  const router = useRouter();
  const { data: session } = useSession();

  const onClick = async () => {
    setLoading(true);
    const email = session?.user.email;
    const token = session?.user.accessToken;
    const id = session?.user.userId;

    const res = await createQuotation({ products, token, email, id });

    if (res.data === null && res.error) {
      const errorMessage = handleErrorMessage(res.error);
      toast({
        variant: "destructive",
        title: "Error de credenciales",
        description: (
          <div className="flex flex-col gap-3">
            <span>{errorMessage}</span>
            <span className="underline">
              <Link href={"/auth/signin"}>Ingresar click Aquí</Link>
            </span>
          </div>
        ),
      });
      setLoading(false);
    } else {
      toast({
        variant: "default",
        title: "Éxito",
        description: "Cotización enviada con éxito",
      });
      setLoading(false);
      // router.push("/dashboard/order");
      // router.refresh();
      // cart();
    }
  };

  return (
    <div>
      <Button disabled={loading} onClick={onClick} variant={"outline"}>
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

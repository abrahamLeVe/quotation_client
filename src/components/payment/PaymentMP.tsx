"use client";
import { payMercadoPago } from "@/app/services/payment.service";
import { useCartContext } from "@/context/cart.context";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useTheme } from "next-themes";
import { z } from "zod";
import { quotationSchema } from "../quotation/table/data/schema";

export type Quotation = z.infer<typeof quotationSchema>;

interface PaymentMPProps {
  quotation: Quotation;
}

export default function PaymentMP({ quotation }: PaymentMPProps) {
  const { setTheme } = useTheme();
  const { setOpenMenu } = useCartContext();

  if (!process.env.NEXT_PUBLIC_MP_KEY) {
    console.error("MercadoPago key is missing!");
    return;
  }
  initMercadoPago(process.env.NEXT_PUBLIC_MP_KEY, { locale: "es-PE" });

  async function onSubmit() {
    try {
      const preferenceId = await payMercadoPago(quotation);
      setTheme("light");
      return preferenceId;
    } catch (error) {
      console.error("Payment submission error: ", error);
      return null;
    } finally {
      setOpenMenu(false);
    }
  }

  return (
    <Wallet
      initialization={{
        redirectMode: "modal",
      }}
      onError={(e) => {
        // console.error("Payment error: ", e);
      }}
      onSubmit={onSubmit}
    />
  );
}

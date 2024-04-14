"use client";
import { payMercadoPago } from "@/app/services/payment.service";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { z } from "zod";
import { quotationSchema } from "../quotation/table/data/schema";
export type Quotation = z.infer<typeof quotationSchema>;

interface PaymentMPProps {
  quotation: Quotation;
}

export default function PaymentMP({ quotation }: PaymentMPProps) {
  const { setTheme } = useTheme();

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_KEY!, { locale: "es-PE" });
  }, []);

  async function onSubmit() {
    const preferenceId = await payMercadoPago(quotation);
    setTheme("light");
    return preferenceId;
  }

  return (
    <Wallet
      initialization={{
        redirectMode: "modal",
      }}
      customization={{}}
      onSubmit={onSubmit}
    />
  );
}

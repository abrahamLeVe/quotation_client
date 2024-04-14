"use server";
import { quotationSchema } from "@/components/quotation/table/data/schema";
import { postDataFromApi } from "@/lib/api";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { z } from "zod";

type Quotation = z.infer<typeof quotationSchema>;

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function payMercadoPago(quotation: Quotation) {
  console.log(quotation);
  const items: Items[] = quotation.products.map((product) => {
    return {
      id: product.id.toFixed(),
      title: product.title,
      quantity: product.quantity,
      unit_price: product.value,
      picture_url: product.picture_url,
    };
  });

  const preference = new Preference(client).create({
    body: {
      items,
    },
  });

  const res = await preference;
  return res.id;
}

interface OrderProps {
  payment_id: number | undefined;
  amount: number | undefined;
  status: string | undefined;
  payment: PaymentResponse;
}

export async function createOrder(data: OrderProps) {
  const res = await postDataFromApi("/api/orders", { data });
  return res;
}

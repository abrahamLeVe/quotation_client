"use server";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function payMercadoPago() {
  const preference = new Preference(client).create({
    body: {
      items: [
        {
          id: "1",
          title: "Mi producto",
          quantity: 1,
          unit_price: 20,
        },
      ],
    },
  });
  const res = await preference;
  
  redirect(res.sandbox_init_point!);
}

"use server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { quotationSchema } from "@/components/quotation/table/data/schema";
import { postDataFromApi } from "@/lib/api";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { getServerSession } from "next-auth";
import { CLIENT_URL } from "@/utilities/urls";

import { z } from "zod";

type Quotation = z.infer<typeof quotationSchema>;

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function payMercadoPago(quotation: Quotation) {
  // const session = await getServerSession(options);
  try {
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
        metadata: {
          cotizacion: {
            id: quotation.id,
          },
          // userToken: session?.user.accessToken,
        },
        back_urls: {
          success: `${CLIENT_URL}/dashboard/order`,
          failure: `${CLIENT_URL}/dashboard/order`,
          pending: `${CLIENT_URL}/dashboard/order`,
        },
        auto_return: "approved",
      },
    });

    const res = await preference;
    console.log("respreference ", res);
    return res.id;
  } catch (error) {
    console.log("Error in preferences Mercado pago ", error);
  }
}

interface OrderProps {
  payment_id: number | undefined;
  amount: number | undefined;
  status: string | undefined;
  cotizacion: {
    id: number;
  };
  // userToken: string;
}

export async function createOrder(order: OrderProps) {
  const session = await getServerSession(options);
  const res = await postDataFromApi(
    "/api/payments",
    {
      data: order,
    },
    session?.user.accessToken
  );
  return res;
}

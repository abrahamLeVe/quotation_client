import { createOrder } from "@/app/services/payment.service";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  const body = await request
    .json()
    .then((data) => data as { data: { id: string } });

  //   const secret = request.headers.get("x-signature-id");
  //   if (secret !== process.env.SECRET) return Response.json({ success: false });

  const payment = await new Payment(client).get({ id: body.data.id });
  if (payment) {
    if (payment.status === "approved") {
      const order = {
        payment_id: payment.id,
        amount: payment.transaction_amount,
        status: payment.status,
        quotation: payment.metadata.quotation,
        user: payment.metadata.user_id,
        userToken: payment.metadata.user_token,
      };
      await createOrder(order);
    }
  }

  return Response.json({ success: true });
}

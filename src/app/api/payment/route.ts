import { NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

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

  const order = {
    id: payment.id,
    amount: payment.transaction_amount,
    message: payment.description,
  };

  console.log("payment", payment);
  return Response.json({ success: true });
}

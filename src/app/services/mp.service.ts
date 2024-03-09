"use server";
import { postDataFromApi } from "@/lib/api";
import { CartItem } from "@/models/cart.model";
import { ProductInterface } from "@/models/products.model";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});
interface PayOrderProps {
  cartItems: ProductInterface[];
  cart: CartItem[];
}

export async function payMercadoPago({ cart, cartItems }: PayOrderProps) {
  const items: Items[] = cart.map((cartItem) => {
    const product = cartItems.find((p) =>
      p.attributes.prices.data.some((price) => price.id === cartItem.id)
    );

    const selectedPrice = product?.attributes.prices.data.find(
      (price) => price.id === cartItem.id
    );

    return {
      id: cartItem.id.toFixed(),
      title: product!.attributes.name,
      quantity: cartItem.quantity,
      unit_price:
        (selectedPrice?.attributes.value ?? 0) -
        (selectedPrice?.attributes.discount ?? 0),
      picture_url: product?.attributes.thumbnail.data.attributes.url,
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

export async function createQuotation({ cart, cartItems }: PayOrderProps) {
  const items: Items[] = cart.map((cartItem) => {
    const product = cartItems.find((p) =>
      p.attributes.prices.data.some((price) => price.id === cartItem.id)
    );

    const selectedPrice = product?.attributes.prices.data.find(
      (price) => price.id === cartItem.id
    );

    return {
      id: cartItem.id.toFixed(),
      title: product!.attributes.name,
      quantity: cartItem.quantity,
      unit_price:
        (selectedPrice?.attributes.value ?? 0) -
        (selectedPrice?.attributes.discount ?? 0),
      picture_url: product?.attributes.thumbnail.data.attributes.url,
    };
  });
  const res = await postDataFromApi("/api/orders", { items });
  return res;
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

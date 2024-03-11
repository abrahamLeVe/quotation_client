import { postDataFromApi } from "@/lib/api";
import { CartItem } from "@/models/cart.model";
import { ProductInterface } from "@/models/products.model";
import { Items } from "mercadopago/dist/clients/commonTypes";

interface PayOrderProps {
  cartItems: ProductInterface[];
  cart: CartItem[];
  email?: string;
}

export async function createQuotation({
  cart,
  cartItems,
  email,
}: PayOrderProps) {
  try {
    const productos: Items[] = cart.map((cartItem) => {
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
        size: selectedPrice?.attributes.size.data?.attributes.name,
        colors: cartItem.colors,
      };
    });

    const res = await postDataFromApi("/api/quotations", {
      data:  { productos, email } ,
    });
    return res;
  } catch (error) {
    console.log("error in quotationService", error);
  }
}

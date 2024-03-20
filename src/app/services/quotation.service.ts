import { postDataFromApi } from "@/lib/api";
import { ProductCart } from "@/models/cart.model";

interface PayOrderProps {
  products: ProductCart[];
  email?: string;
  token?: string;
  id?: number;
}

export async function createQuotation({
  products,
  email,
  token,
  id,
}: PayOrderProps) {
  try {
    const res = await postDataFromApi(
      "/api/quotations",
      {
        data: { products, email, user: { id } },
      },
      token
    );
    return res;
  } catch (error) {
    console.log("error in quotationService", error);
  }
}

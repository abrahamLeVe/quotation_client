import { postDataFromApi } from "@/lib/api";
import { Items } from "@/models/quotation.model";

interface PayOrderProps {
  products: Items[];
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
    console.log("quotation res service ", res);
    return res;
  } catch (error) {
    console.log("error in quotationService", error);
  }
}

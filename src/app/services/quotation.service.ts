"use server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { postDataFromApi, putDataFromApi } from "@/lib/api";
import { ProductCart } from "@/models/cart.model";
import { QuotationData } from "@/models/quotation.model";
import { getServerSession } from "next-auth";

interface CreateQuotationProps {
  products: ProductCart[];
  dataQuotation: QuotationData;
}

export async function createQuotation({
  products,
  dataQuotation,
}: CreateQuotationProps) {
  const session = await getServerSession(options);
  const token = session?.user.accessToken;
  const id = session?.user.userId;
  try {
    const res = await postDataFromApi(
      "/api/quotations",
      {
        data: { products, ...dataQuotation, user: { id } },
      },
      token
    );
    return res;
  } catch (error) {
    console.log("error in createQuotation", error);
  }
}

export async function cancelQuotation(idQuotation: number) {
  const session = await getServerSession(options);
  const token = session?.user.accessToken;
  console.log(idQuotation);
  try {
    const res = await putDataFromApi(
      `/api/quotations/${idQuotation.toString()}`,
      {
        data: {
          id: idQuotation,
          state: 5,
          codeStatus: "Cancelada",
          email: session?.user.email,
        },
      },
      token
    );
    return res;
  } catch (error) {
    console.log("error in putDataFromApi", error);
  }
}

export async function archiveQuotation(idQuotation: number) {
  const session = await getServerSession(options);
  const token = session?.user.accessToken;
  console.log(idQuotation);
  try {
    const res = await putDataFromApi(
      `/api/quotations/${idQuotation.toString()}`,
      {
        data: {
          id: idQuotation,
          codeStatus: "Cerrada",
          publishedAt: null,
        },
      },
      token
    );
    return res;
  } catch (error) {
    console.log("error in archiveQuotation", error);
  }
}

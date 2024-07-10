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

export interface UpdateQuotationProps {
  idQuotation: number;
  codeStatus?: string;
  state?: number;
  isArchived?: boolean;
}

export async function updateQuotation({
  idQuotation,
  codeStatus = "Cancelada",
  state = 5,
  isArchived = false,
}: UpdateQuotationProps) {
  const session = await getServerSession(options);
  const token = session?.user.accessToken;
  let data = {};

  if (isArchived === true) {
    data = {
      publishedAt: null,
    };
  }

  try {
    const res = await putDataFromApi(
      `/api/quotations/${idQuotation.toString()}`,
      {
        data: {
          ...data,
          id: idQuotation,
          codeStatus: codeStatus,
          state: state,
          userId: session?.user.userId,
          email: session?.user.email,
        },
      },
      token
    );
    return res;
  } catch (error) {
    console.log("error in updateQuotation", error);
  }
}

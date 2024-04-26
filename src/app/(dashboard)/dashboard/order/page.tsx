import { options } from "@/app/api/auth/[...nextauth]/options";
import { columns } from "@/components/quotation/table/columns";
import { DataTable } from "@/components/quotation/table/data-table";
import { quotationSchema } from "@/components/quotation/table/data/schema";
import { getUserFromApi } from "@/lib/api";
import { getServerSession } from "next-auth/next";

import { z } from "zod";
// export const revalidate = 6;

export default async function OrderPage() {
  const session = await getServerSession(options);
  const res = await getUserFromApi(session?.user.accessToken || "");
  const quotationsData = res?.quotations;
  const quotations = z
    .array(quotationSchema)
    .parse(quotationsData || [])
    .reverse();

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Cotizaciones</h2>
      </div>
      <DataTable data={quotations} columns={columns} error={res?.error} />
    </div>
  );
}

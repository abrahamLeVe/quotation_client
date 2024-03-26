import { options } from "@/app/api/auth/[...nextauth]/options";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { promises as fs } from "fs";
import { getServerSession } from "next-auth";
import path from "path";
import { cache } from "react";

const getUbigeo = cache(async () => {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/(checkout)/checkout/data/peru.json")
  );

  const peru = JSON.parse(data.toString());
  return peru;
});

export default async function CheckoutPage() {
  const session = await getServerSession(options);
  const peru = await getUbigeo();
  return (
    <>
      <CheckoutForm session={session} peru={peru} />
    </>
  );
}

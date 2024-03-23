import { options } from "@/app/api/auth/[...nextauth]/options";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { getServerSession } from "next-auth";

export default async function CheckoutPage() {
  const session = await getServerSession(options);
  console.log("session ", session);
  return (
    <>
      <CheckoutForm session={session} />
    </>
  );
}

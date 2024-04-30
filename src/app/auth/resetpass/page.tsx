import { options } from "@/app/api/auth/[...nextauth]/options";
import ResetPassForm from "@/components/auth/resetpass/ResetPassForm";
import { getServerSession } from "next-auth";

export default async function ResetPassPage({
  searchParams,
}: {
  searchParams: {
    callbackUrl?: string;
    error?: string;
  };
}) {
  const session = await getServerSession(options);

  return <ResetPassForm session={session} searchParams={searchParams} />;
}

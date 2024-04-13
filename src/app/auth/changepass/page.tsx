import { options } from "@/app/api/auth/[...nextauth]/options";
import ChangePassForm from "@/components/auth/changepass/ChangePassForm";
import { getServerSession } from "next-auth";

export default async function ChangePassPage({
  searchParams,
}: {
  searchParams: {
    callbackUrl?: string;
    error?: string;
    code?: string;
  };
}) {
  const session = await getServerSession(options);
  const code = searchParams.code;

  return (
    <>
      <ChangePassForm session={session} code={code} />
    </>
  );
}

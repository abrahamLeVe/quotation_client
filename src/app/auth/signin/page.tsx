import { options } from "@/app/api/auth/[...nextauth]/options";
import SigninForm from "@/components/auth/signin/SigninForm";
import { getServerSession } from "next-auth";

export default async function SigninPage({
  searchParams,
}: {
  searchParams: {
    callbackUrl?: string;
    error?: string;
  };
}) {
  const session = await getServerSession(options);

  return <SigninForm session={session} searchParams={searchParams} />;
}

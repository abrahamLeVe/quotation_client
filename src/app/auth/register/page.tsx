import RegisterForm from "@/components/auth/register/RegisterForm";
import { Metadata } from "next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Registro",
};

export default async function Page({
  searchParams,
}: {
  searchParams: {
    callbackUrl?: string;
    error?: string;
  };
}) {
  const session = await getServerSession(options);
  return <RegisterForm session={session} searchParams={searchParams} />;
}

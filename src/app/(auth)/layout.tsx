"use client";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { signOut, useSession } from "next-auth/react";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  const { data: session } = useSession();

  if (session) {
    signOut({ redirect: false });
  }
  return (
    <>
      <NavBar />
      <main className="relative  min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

"use client";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { signOut, useSession } from "next-auth/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        signOut({ redirect: false })
      ) : (
        <>
          <NavBar />
          <main className="relative  min-h-screen">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}

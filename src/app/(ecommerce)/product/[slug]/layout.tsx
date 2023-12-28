"use client";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { useSession } from "next-auth/react";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  return (
    <>
      <NavBar session={session} />
      <main className="flex flex-col max-w-screen-xl mx-auto gap-5 relative p-3 md:p-5">
        {children}
      </main>
      <Footer />
    </>
  );
}

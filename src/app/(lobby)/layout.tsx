"use client";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";

export default function LobbyLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <NavBar />
      <main className="flex flex-col max-w-screen-xl mx-auto items-center gap-5">
        {children}
      </main>
      <Footer />
    </>
  );
}

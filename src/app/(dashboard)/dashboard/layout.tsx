"use client";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";

export default function LobbyLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <NavBar />
      <main className="flex flex-col max-w-screen-xl m-auto relative">
        {children}
      </main>
      <Footer />
    </>
  );
}

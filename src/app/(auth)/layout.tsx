"use client";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

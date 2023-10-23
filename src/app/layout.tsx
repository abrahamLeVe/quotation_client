import NavBar from "@/components/NavBar";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ShoppingCartProvider } from "@/context/cart.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DSStore",
  description: "Tienda en línea de productos novedosos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ShoppingCartProvider>
          <NavBar />
          {children}
          <Footer />
        </ShoppingCartProvider>
      </body>
    </html>
  );
}

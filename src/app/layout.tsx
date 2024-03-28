import Providers from "@/components/Providers";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Cotiza en línea con Consorcio A&C Eléctrica S.A.C.",
  openGraph: {
    title: "Consorcio A&C Eléctrica S.A.C.",
    description:
      "Cotiza en línea con Consorcio A&C Eléctrica S.A.C. para obtener los mejores precios en materiales eléctricos para transformadores. ¡Solicita tu cotización ahora y descubre nuestras ofertas!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"es"} className={`${inter.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

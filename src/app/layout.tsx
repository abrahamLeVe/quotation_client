import Providers from "@/components/Providers";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ImageLoaderProps } from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"es"}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import background from "../../../../../public/logoAyC.png";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar background={background} />
      <Breadcrumbs
        segments={[
          {
            title: "Inicio",
            href: "/",
          },
          {
            title: "Detalles del producto",
            href: "",
          },
        ]}
      />
      {children}
      <Footer />
    </>
  );
}

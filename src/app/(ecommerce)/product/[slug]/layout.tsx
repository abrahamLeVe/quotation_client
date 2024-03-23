import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
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

import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar isCart={true} />
      <main className="flex flex-col md:container m-auto relative">
        <Breadcrumbs
          segments={[
            {
              title: "Inicio",
              href: "/",
            },
            {
              title: "Carrito con productos",
              href: "",
            },
          ]}
        />
        {children}
      </main>
      <Footer />
    </>
  );
}

import NavBar from "@/components/navbar/NavBar";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import dynamic from "next/dynamic";
import background from "../../../../../public/logoAyC.png";
import backgroundMovil from "../../../../../public/logoelectrica.jpg";

const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
});

export default async function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar
        background={background}
        isDashboard={true}
        backgroundMovil={backgroundMovil}
      />
      <main className="flex flex-col md:container m-auto relative min-h-screen">
        <Breadcrumbs
          segments={[
            {
              title: "Inicio",
              href: "/",
            },
            {
              title: "Mis cotizaciones",
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

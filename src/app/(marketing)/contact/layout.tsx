import { options } from "@/app/api/auth/[...nextauth]/options";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

import { getServerSession } from "next-auth";
import background from "../../../../public/logoAyC.png";
import backgroundMovil from "../../../../public/logoelectrica.jpg";

export default async function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  return (
    <>
      <NavBar
        background={background}
        isDashboard
        backgroundMovil={backgroundMovil}
      />
      <main className="flex flex-col md:container mx-auto items-center gap-8 relative">
        <Breadcrumbs
          segments={[
            {
              title: "Inicio",
              href: "/",
            },
            {
              title: "Contacto",
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

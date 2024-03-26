import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import background from "../../../../public/logoAyC.png";

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar background={background} />
      <main className="flex flex-col md:container m-auto relative">
        {children}
      </main>
      <Footer />
    </>
  );
}

import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar isCart={true} />
      {children}
      <Footer />
    </>
  );
}

import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

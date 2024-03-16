import CheckoutIndex from "@/components/checkout/CheckoutIndex";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="flex flex-col md:container m-auto relative">
        <CheckoutIndex />
        {children}
      </main>
      <Footer />
    </>
  );
}

import CartIndex from "@/components/cart/CartIndex";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";

export default  function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <NavBar /> */}
      <main className="flex flex-col max-w-screen-xl m-auto relative">
        <CartIndex />
        {children}
      </main>
      <Footer />
    </>
  );
}

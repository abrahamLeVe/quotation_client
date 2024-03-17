import CartIndex from "@/components/cart/CartIndex";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
// import dynamic from "next/dynamic";
// const CartIndex = dynamic(() => import("@/components/cart/CartIndex"), {
//   ssr: false,
//   loading: () => <>Loading....</>,
// });

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="flex flex-col md:container m-auto relative">
        <CartIndex />
        {children}
      </main>
      <Footer />
    </>
  );
}

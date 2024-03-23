import dynamic from "next/dynamic";
import CartProducts from "./CartProducts";
const CartSummary = dynamic(() => import("./message/CartSummary"), {
  ssr: false,
});
const EmptyCartMessage = dynamic(() => import("./message/EmptyCartMessage"), {
  ssr: false,
});

export default function CartIndex() {
  return (
    <div className="px-4 py-6 sm:px-6 w-full min-h-screen">
      <div className="text-lg font-medium ">Carrito de compras</div>
      <div className="flex flex-col-reverse lg:flex-row mt-8 relative gap-4 ">
        <CartProducts isPage />
        <CartSummary />
      </div>
      <EmptyCartMessage score={0} title="También podria interesarte" isPage />
    </div>
  );
}

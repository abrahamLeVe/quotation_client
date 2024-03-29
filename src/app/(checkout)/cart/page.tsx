import { getDataProducts } from "@/app/services/product.service";
import CartProducts from "@/components/cart/CartProducts";
import CartSummary from "@/components/cart/message/CartSummary";
import EmptyCartMessage from "@/components/cart/message/EmptyCartMessage";

export default async function CartPage() {
  const products = await getDataProducts();
  return (
    <div className="px-4 py-6 sm:px-6 w-full min-h-screen">
      <div className="flex flex-col lg:flex-row relative gap-4 ">
        <CartProducts isPage={true} />
        <CartSummary />
      </div>
      <EmptyCartMessage
        score={0}
        title="También podria interesarte"
        isPage
        products={products}
      />
    </div>
  );
}

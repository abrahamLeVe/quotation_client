"use client";
import { cartStore } from "@/store/cart.store";
import dynamic from "next/dynamic";
// import CartItem from "../cart/CartItem";
const CartItem = dynamic(() => import("../cart/CartItem"));
// import QuotationSend from "../quotation/QuotationSend";
const QuotationSend = dynamic(() => import("../quotation/QuotationSend"), {
  ssr: false,
});

export default function CheckoutIndex() {
  const cart = cartStore((state) => state);
  return (
    <div className="px-4 py-6 sm:px-6 w-full min-h-screen">
      <div className="text-lg font-medium ">Checkout</div>
      <div className="flex flex-col lg:flex-row mt-8 relative gap-4 ">
        {cart.cartItemState.length === 0 ? (
          <>Carrito vacío</>
        ) : (
          <>
            <CartItem isPage />
            <div className="sticky top-20 h-full my-8 lg:max-w-md w-full">
              <table className="border-collapse w-full text-sm shadow-sm">
                <thead>
                  <tr>
                    <th className="border-b p-4 pt-0 pb-3 text-left">
                      Resumen del pedido
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="border-b"></td>
                  </tr>
                  <tr>
                    <td className="flex flex-col gap-3 border-b  text-sm p-4 ">
                      <div className="flex justify-between items-center gap-2"></div>
                      <div className="flex justify-between gap-2">
                        <div>
                          <p>Despacho (Recoger en tienda)</p>
                        </div>
                        <div>
                          <p className=" font-semibold">$0.00</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b text-lg font-semibold p-4">
                      <div className="flex justify-end items-center">
                        <QuotationSend />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

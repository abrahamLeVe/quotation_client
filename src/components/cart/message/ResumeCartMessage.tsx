"use client";
import QuotationCheck from "@/components/quotation/QuotationCheck";
import { cartStore } from "@/store/cart.store";

export default function ResumeCartMessage() {
  const cart = cartStore((state) => state.cartItemState);
  return (
    <>
      {cart?.length > 0 ? (
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
                    <QuotationCheck />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}

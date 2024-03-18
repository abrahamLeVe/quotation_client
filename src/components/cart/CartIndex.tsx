"use client";

import dynamic from "next/dynamic";
const CartItem = dynamic(() => import("./CartItem"));
const QuotationCheck = dynamic(() => import("../quotation/QuotationCheck"), {
  ssr: false,
});

export default function CartIndex() {
  return (
    <div className="px-4 py-6 sm:px-6 w-full">
      <div className="text-lg font-medium ">Carrito de compras</div>
      <div className="flex flex-col lg:flex-row mt-8 relative gap-4 ">
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
                    <QuotationCheck />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

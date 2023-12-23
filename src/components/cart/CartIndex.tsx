"use client";
import { useCartContext } from "@/context/cart.context";
import { formatCurrency } from "@/utilities/utils";
import DisclosureIndex from "../ui/Disclosure";
import CartItem from "./CartItem";

export default function CartIndex() {
  const { subTotal, calculateTotal } = useCartContext();
  const total = calculateTotal().total;
  return (
    <div className="px-4 py-6 sm:px-6 w-full">
      <div className="text-lg font-medium text-gray-900">
        Carrito de compras
      </div>
      <div className="flex flex-col lg:flex-row mt-8 relative gap-4 ">
        {/* table */}
        <CartItem isPage />

        {/* resume */}
        <div className="sticky top-4 h-full my-8 lg:max-w-md w-full">
          <table className="border-collapse w-full text-sm shadow-sm">
            <thead>
              <tr>
                <th className="border-b p-4 pt-0 pb-3 text-left">
                  Resumen del pedido
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              <tr>
                <td className="border-b">
                  <DisclosureIndex
                    title={"Estimación de envío"}
                    child={
                      <>
                        Ingrese su dirección para obtener una estimación de
                        costo de envío.
                      </>
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="flex flex-col gap-3 border-b  text-sm p-4 ">
                  <div className="flex justify-between gap-2">
                    <div>
                      <p>Subtotal:</p>
                    </div>
                    <div className=" font-semibold">
                      {formatCurrency(subTotal)}
                    </div>
                  </div>
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
                  <div className="flex justify-between">
                    <div>
                      <p>Total</p>
                    </div>
                    <div className="text-red-600">{formatCurrency(total)}</div>
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

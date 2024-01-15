"use client";
import { useCartContext } from "@/context/cart.context";
import { cartStore } from "@/store/cart.store";
import { formatCurrency } from "@/utilities/utils";
import dynamic from "next/dynamic";
import { Icons } from "../Icons";
import DisclosureIndex from "../ui/Disclosure";
const CartItem = dynamic(() => import("./CartItem"), {
  ssr: false,
  loading: () => <>Cargando items...</>,
});

export default function CartIndex() {
  const cart = cartStore((state) => state);
  const { subTotal, calculateTotal, isLoading } = useCartContext();
  const total = calculateTotal().total;
  return (
    <div className="px-4 py-6 sm:px-6 w-full">
      <div className="text-lg font-medium ">Carrito de compras</div>
      <div className="flex flex-col lg:flex-row mt-8 relative gap-4 ">
        {cart.cartItemState.length === 0 ? (
          <>Sin product_colors</>
        ) : (
          <>
            <CartItem isPage />
            <div className="sticky top-4 h-full my-8 lg:max-w-md w-full">
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
                      <div className="flex justify-between items-center gap-2">
                        <div>
                          <p>Subtotal:</p>
                        </div>
                        <div className=" font-semibold">
                          {isLoading ? (
                            <Icons.spinner
                              className="mr-2 h-5 w-5 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <>{formatCurrency(subTotal)}</>
                          )}
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
                      <div className="flex justify-between items-center">
                        <div>
                          <p>Total</p>
                        </div>
                        <div className="text-red-600">
                          {isLoading ? (
                            <Icons.spinner
                              className="mr-2 h-6 w-6 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <>{formatCurrency(total)}</>
                          )}
                        </div>
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

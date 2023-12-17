"use client";
import { useCartContext } from "@/context/cart.context";
import { useProductContext } from "@/context/product.context";
import { cartStore } from "@/store/cart.store";
import { formatCurrency, truncate } from "@/utilities/utils";
import { BsCartDash, BsCartPlus, BsEye } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import ProductPrice from "../product/ProductPrice";
import DisclosureIndex from "../ui/Disclosure";
import { Button } from "../ui/button";

export default function CartIndex() {
  const cart = cartStore((state) => state);
  const { getItemQuantity, cartItems, subTotal, calculateTotal } =
    useCartContext();
  const { setProduct, setIsOpen } = useProductContext();

  const total = calculateTotal().total;
  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="text-lg font-medium text-gray-900">
        Carrito de compras
      </div>
      <div className="flex flex-col md:flex-row mt-8 relative gap-4">
        {/* table */}
        <div className="overflow-auto w-full h-full my-8 shadow-sm scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 select-none">
          <table className="table-auto w-full text-sm">
            <thead className="text-left">
              <tr>
                <th className="border-b p-4 pl-8 pt-0 pb-3">Producto</th>
                <th className="border-b p-4 pt-0 pb-3">Precio</th>
                <th className="border-b p-4 pt-0 pb-3">Cantidad</th>
                <th className="border-b p-4 pt-0 pb-3">Subtotal</th>
                <th className="border-b p-4 pr-8 pt-0 pb-3"></th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {cartItems.map((product) => (
                <tr key={product.id} className="relative">
                  <td className="border-b p-4 pl-8">
                    <div className="flex gap-2">
                      <div
                        className="h-24 w-24 overflow-hidden flex-shrink-0 rounded-md border border-gray-200 relative"
                        title="Detalles"
                      >
                        <Button
                          onClick={() => {
                            setProduct([product]), setIsOpen(true);
                          }}
                          title="Ver mas detalles"
                          className="absolute bg-white/20 bg-opacity-80 backdrop-filter backdrop-blur-md text-gray-900 "
                        >
                          <BsEye className="h-6 w-6" />
                        </Button>

                        <img
                          src={
                            product.attributes.thumbnail.data?.attributes
                              .formats.thumbnail.url
                          }
                          alt={product.attributes.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="text-base font-medium text-gray-900">
                        <h3 title={product.attributes.name}>
                          {truncate(product.attributes.name, 50)}
                        </h3>
                      </div>
                    </div>
                  </td>
                  <td className="border-b p-4">
                    <div className="flex flex-col gap-3">
                      <ProductPrice
                        discount={
                          product.attributes.prices.data[0]?.attributes
                            .discount!
                        }
                        price={
                          product.attributes.prices.data[0]?.attributes.value
                        }
                      />
                    </div>
                  </td>
                  <td className="border-b p-4">
                    <div className="flex flex-1 items-center gap-3">
                      <Button
                        onClick={() => {
                          cart.decreaseCartQuantity(product.id);
                        }}
                        title="Restar"
                      >
                        <BsCartDash className="h-6 w-6" />
                      </Button>
                      <p>x{getItemQuantity(product.id)}</p>
                      <Button
                        onClick={() => {
                          cart.increaseCartQuantity(product.id);
                        }}
                        title="Añadir"
                      >
                        <BsCartPlus className="h-6 w-6" />
                      </Button>
                    </div>
                  </td>
                  <td className="border-b p-4">
                    <div className="flex flex-row gap-5">
                      {formatCurrency(
                        (product.attributes.prices.data[0]?.attributes.value -
                          product.attributes.prices.data[0]?.attributes
                            .discount!) *
                          getItemQuantity(product.id)
                      )}
                    </div>
                  </td>
                  <td className="border-b p-4 pr-8">
                    <Button
                      onClick={() => {
                        cart.removeCartItem(product.id);
                      }}
                      title="Eliminar del carrito"
                    >
                      <MdDeleteOutline className="h-6 w-6" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* resume */}
        <div className="sticky top-4 h-full my-8">
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

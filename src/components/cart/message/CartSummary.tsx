"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cartStore } from "@/store/cart.store";
import dynamic from "next/dynamic";
const QuotationCheck = dynamic(
  () => import("@/components/quotation/QuotationCheck"),
  {
    ssr: false,
  }
);
const QuotationSend = dynamic(
  () => import("@/components/quotation/QuotationSend"),
  {
    ssr: false,
  }
);

interface CartSummaryProps {
  isCart?: boolean;
}

export default function CartSummary({ isCart = true }: CartSummaryProps) {
  const cart = cartStore((state) => state.cartItemState);
  const calculateTotal = (field: string) => {
    let total = 0;
    cart.forEach((product) => {
      if (field === "quantity") {
        total += product.quantity;
      } else if (field === "size" && product.size) {
        total += product.size ? 1 : 0;
      } else if (field === "colors") {
        total += product.colors!.length;
      }
    });

    return total;
  };
  return (
    <>
      {cart?.length > 0 ? (
        <div
          className={`sticky  h-full  w-full lg:w-1/2 ${
            isCart ? "top-20" : "top-0"
          }`}
        >
          <div className="flex flex-col gap-2 ">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">
                  Resumen de productos
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableCaption>{`Existen ${
                      cart.length
                    } productos en el carrito, total de unidades ${calculateTotal(
                      "quantity"
                    )}, medida(s) ${calculateTotal(
                      "size"
                    )} y colores ${calculateTotal("colors")}.`}</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Producto</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Medida</TableHead>
                        <TableHead>Colores</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <img
                                    src={product.picture_url}
                                    alt={product.title!}
                                    className="aspect-square w-full object-cover object-center"
                                    loading="lazy"
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{product.title}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.size || "-"}</TableCell>
                          <TableCell>
                            {product.colors!.length > 0
                              ? product.colors!.map((color) => (
                                  <div key={color.id}>
                                    {color.color!.attributes.name} (
                                    {color.quantity})
                                  </div>
                                ))
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={1}>Total</TableCell>
                        <TableCell>{calculateTotal("quantity")}</TableCell>
                        <TableCell>{calculateTotal("size")}</TableCell>
                        <TableCell>{calculateTotal("colors")}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className=" ml-auto">
              {isCart ? <QuotationCheck /> : <QuotationSend />}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip, TooltipProvider } from "@radix-ui/react-tooltip";
import { BsEye } from "react-icons/bs";
import { z } from "zod";
import { quotationSchema } from "./data/schema";

export type Quotation = z.infer<typeof quotationSchema>;
interface ResumeQuotationTProps {
  quotation: Quotation;
}

export function ResumeQuotationTable({ quotation }: ResumeQuotationTProps) {
  const { products } = quotation;
  const calculateTotal = (field: string) => {
    let total = 0;
    products.forEach((product) => {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={
            "absolute bg-white/20 bg-opacity-80 backdrop-filter backdrop-blur-md  "
          }
          title="Ver mas detalles"
        >
          Resumen
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-6xl h-full max-h-[600px]">
        <ScrollArea>
          <div className="flex flex-col lg:flex-row gap-5">
            <Table>
              <TableCaption>{`Existen ${
                products.length
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
                {products.map((product) => (
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
                            <div key={color?.id}>
                              {color?.color.attributes.name} ({color?.quantity})
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
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

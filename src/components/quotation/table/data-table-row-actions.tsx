"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  archiveQuotation,
  cancelQuotation,
} from "@/app/services/quotation.service";
import PaymentMP from "@/components/payment/PaymentMP";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { generatePdf } from "@/components/voucher/voucher";
import { FaDownload } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { z } from "zod";
import { quotationSchema } from "./data/schema";
import { ResumeQuotationTable } from "./resume-quotation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const quotation = quotationSchema.parse(row.original);

  async function handleCancelQuotation(idQuotation: number) {
    const res = await cancelQuotation(idQuotation);
    console.log("res ", res);
    if (res.data === null && res.error) {
      toast({
        variant: "destructive",
        title: res.error.message,
        description: (
          <div className="flex flex-col gap-3">
            <span>{res.error.details}</span>
          </div>
        ),
      });
      // setIsLoading(false);
    } else {
      toast({
        variant: "default",
        title: "Éxito",
        description:
          "Cotización cancelada con éxito, revise su correo para mas información, gracias por su preferencia.",
      });
      // router.push("/dashboard/order");
      // router.refresh();
      // cart();
      // setIsLoading(false);
    }
  }

  async function handleArchiveQuotation(idQuotation: number) {
    const res = await archiveQuotation(idQuotation);
    console.log("res ", res);
    if (res.data === null && res.error) {
      toast({
        variant: "destructive",
        title: res.error.message,
        description: (
          <div className="flex flex-col gap-3">
            <span>{res.error.details}</span>
          </div>
        ),
      });
      // setIsLoading(false);
    } else {
      toast({
        variant: "default",
        title: "Éxito",
        description:
          "Cotización cancelada con éxito, revise su correo para mas información, gracias por su preferencia.",
      });
      // router.push("/dashboard/order");
      // router.refresh();
      // cart();
      // setIsLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <div className="relative">
        <div className="">
          {quotation.codeStatus === "Completada" ? (
            <PaymentMP quotation={quotation} />
          ) : (
            <ResumeQuotationTable quotation={quotation} />
          )}
        </div>
      </div>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row justify-end w-40 ">
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-[300px] w-full">
        {quotation.codeStatus === "Completada" ? (
          <>
            <DropdownMenuItem>
              <button
                onClick={() => handleGeneratePdf(quotation)}
                className="flex gap-1"
              >
                <FaDownload />
                Descargar comprobante
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={() => handleCancelQuotation(quotation.id)}
                className="flex gap-1"
              >
                <MdOutlineCancel />
                Cancelar
              </button>
            </DropdownMenuItem>
          </>
        ) : null}
        {quotation.codeStatus === "Cerrada" ? (
          <>
            <DropdownMenuItem>
              <button
                onClick={() => handleGeneratePdf(quotation)}
                className="flex gap-1"
              >
                <FaDownload />
                Descargar comprobante
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={() => handleArchiveQuotation(quotation.id)}
                className="flex gap-1"
              >
                Archivar
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </button>
            </DropdownMenuItem>
          </>
        ) : null}

        {(quotation.codeStatus === "Vencida" ||
          quotation.codeStatus === "Cancelada") && (
          <DropdownMenuItem>
            <button
              onClick={() => handleArchiveQuotation(quotation.id)}
              className="flex gap-1"
            >
              Archivar
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type Quotation = z.infer<typeof quotationSchema>;

const handleGeneratePdf = (cotizacion: Quotation) => {
  generatePdf(cotizacion);
};

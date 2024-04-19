"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  archiveQuotation,
  cancelQuotation,
} from "@/app/services/quotation.service";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { generatePdf } from "@/components/voucher/voucher";
import { FaBoxArchive, FaDownload } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { z } from "zod";
import { quotationSchema } from "./data/schema";
import { ResumeQuotationTable } from "./resume-quotation";
import { useRouter } from "next/navigation";
import { voucheMP } from "@/components/voucher/voucherMP";
import dynamic from "next/dynamic";

const PaymentMP = dynamic(() => import("@/components/payment/PaymentMP"), {
  ssr: false,
  loading: () => <div className="w-[346px] h-[103px]">Cargando ajajajajaj</div>,
});

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const quotation = quotationSchema.parse(row.original);

  async function handleCancelQuotation(idQuotation: number) {
    const res = await cancelQuotation(idQuotation);
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
      router.refresh();
      // setIsLoading(false);
    }
  }

  async function handleArchiveQuotation(idQuotation: number) {
    const res = await archiveQuotation(idQuotation);
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
          "Cotización archivada con éxito, revise su correo para mas información, gracias por su preferencia.",
      });
      router.refresh();
      // setIsLoading(false);
    }
  }

  return (
    <DropdownMenu>
      {quotation.codeStatus === "Completada" ? (
        <div className="w-[346px] h-[103px]">
          <PaymentMP quotation={quotation} />
        </div>
      ) : null}
      {quotation.codeStatus === "En progreso" ? (
        <div className="flex flex-row justify-start w-40 ">
          <div className="flex h-8 w-8 p-0">
            <ResumeQuotationTable quotation={quotation} />
          </div>
        </div>
      ) : (
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
      )}

      <DropdownMenuContent align="end" className="max-w-[300px] w-full">
        {quotation.codeStatus === "Completada" ? (
          <>
            <DropdownMenuItem
              className="flex gap-1"
              onClick={() => handleGeneratePdf(quotation)}
            >
              <FaDownload />
              Descargar comprobante
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-1"
              onClick={() => handleCancelQuotation(quotation.id)}
            >
              <MdOutlineCancel />
              Cancelar
            </DropdownMenuItem>
          </>
        ) : null}
        {quotation.codeStatus === "Cerrada" ? (
          <>
            {quotation.pago === null ? (
              <DropdownMenuItem
                onClick={() => handleGeneratePdf(quotation)}
                className="flex gap-1"
              >
                <FaDownload />
                Descargar comprobante
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => handleGeneratePdfMP(quotation)}
                className="flex gap-1"
              >
                <FaDownload />
                Descargar boleta
              </DropdownMenuItem>
            )}
          </>
        ) : null}

        {(quotation.codeStatus === "Vencida" ||
          quotation.codeStatus === "Cancelada") && (
          <DropdownMenuItem
            onClick={() => handleArchiveQuotation(quotation.id)}
            className="flex gap-1"
          >
            <FaBoxArchive />
            Archivar
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
const handleGeneratePdfMP = (cotizacion: Quotation) => {
  voucheMP(cotizacion);
};

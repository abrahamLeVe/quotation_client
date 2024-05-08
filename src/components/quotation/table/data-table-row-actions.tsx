"use client";

import { Row } from "@tanstack/react-table";

import {
  UpdateQuotationProps,
  updateQuotation,
} from "@/app/services/quotation.service";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { generatePdf } from "@/components/voucher/voucher";
import { voucheMP } from "@/components/voucher/voucherMP";
import { useCartContext } from "@/context/cart.context";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { FaBoxArchive, FaDownload } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { z } from "zod";
import { quotationSchema } from "./data/schema";
import { ResumeQuotationTable } from "./resume-quotation";

const PaymentMP = dynamic(() => import("@/components/payment/PaymentMP"), {
  ssr: false,
});

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const quotation = quotationSchema.parse(row.original);
  const { isLoading, setIsLoading, openMenu, setOpenMenu } = useCartContext();

  async function handleUpdateQuotation({
    idQuotation,
    codeStatus,
    isArchived,
    state,
  }: UpdateQuotationProps) {
    try {
      setIsLoading(true);

      const res = await updateQuotation({
        idQuotation,
        codeStatus,
        state,
        isArchived,
      });
      router.refresh();

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
      } else {
        toast({
          variant: "default",
          title: "Éxito",
          description:
            "Cotización actualizada con éxito, revise su correo para mas información, gracias por su preferencia.",
        });
      }
    } catch (error) {
      console.log("Error in table actions ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`flex flex-col max-w-[280px] justify-end w-full gap-1 relative ${
        isLoading && "pointer-events-none"
      }`}
    >
      {isLoading && (
        <Button className="w-full h-full justify-center bg-white/5 backdrop-blur-sm absolute inset-0">
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        </Button>
      )}
      {isDateLimitPast(quotation) ? (
        <Button
          onClick={() =>
            handleUpdateQuotation({
              idQuotation: quotation.id,
              isArchived: true,
              codeStatus: "Vencido",
              state: 7,
            })
          }
        >
          <FaBoxArchive />
          Archivar por vecimiento
        </Button>
      ) : (
        <>
          {quotation.codeStatus === "Completada" ? (
            <>
              <Button
                className="flex gap-1"
                onClick={() =>
                  handleUpdateQuotation({
                    idQuotation: quotation.id,
                  })
                }
              >
                <MdOutlineCancel />
                Cancelar
              </Button>
              <Dialog open={openMenu} onOpenChange={setOpenMenu}>
                <Button onClick={() => setOpenMenu(true)}>
                  Pagar
                  <FaCcVisa className="h-7 w-7" />
                  <FaCcMastercard className="h-7 w-7" />
                </Button>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Pasarela de pagos</DialogTitle>
                    <DialogDescription>
                      Seleccione su método de pago favoríto:
                    </DialogDescription>
                  </DialogHeader>

                  <div className="w-[374.79px] h-[102.95px] relative ">
                    <PaymentMP quotation={quotation} />
                  </div>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <></>
          )}

          {quotation.codeStatus === "En progreso" ? (
            <ResumeQuotationTable quotation={quotation} />
          ) : (
            <></>
          )}

          {quotation.codeStatus === "Completada" ||
          quotation.codeStatus === "Pago pendiente" ? (
            <Button
              className="flex gap-1"
              onClick={() => handleGeneratePdf(quotation)}
            >
              <FaDownload />
              Descargar comprobante
            </Button>
          ) : (
            <></>
          )}
          {quotation.codeStatus === "Cerrada" ? (
            <>
              {quotation.pago === null ? (
                <Button
                  onClick={() => handleGeneratePdf(quotation)}
                  className="flex gap-1"
                >
                  <FaDownload />
                  Comprobante
                </Button>
              ) : (
                <Button
                  onClick={() => handleGeneratePdfMP(quotation)}
                  className="flex gap-1"
                >
                  <FaDownload />
                  Boleta de venta
                </Button>
              )}
            </>
          ) : null}

          {(quotation.codeStatus === "Vencido" ||
            quotation.codeStatus === "Cancelada") && (
            <Button
              onClick={() =>
                handleUpdateQuotation({
                  idQuotation: quotation.id,
                  isArchived: true,
                })
              }
              className="flex gap-1"
            >
              <FaBoxArchive />
              Archivar
            </Button>
          )}
        </>
      )}
    </div>
  );
}

type Quotation = z.infer<typeof quotationSchema>;

const handleGeneratePdf = (cotizacion: Quotation) => {
  generatePdf(cotizacion);
};
const handleGeneratePdfMP = (cotizacion: Quotation) => {
  voucheMP(cotizacion);
};
const isDateLimitPast = (quotation: Quotation) => {
  const today = new Date();
  const dateLimit = new Date(quotation.dateLimit);

  return dateLimit < today;
};

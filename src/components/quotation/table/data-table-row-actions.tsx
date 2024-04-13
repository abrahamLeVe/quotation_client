"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { generatePdf } from "@/components/voucher/voucher";
import { z } from "zod";
import { labels } from "./data/data";
import { quotationSchema } from "./data/schema";
import { ResumeQuotationTable } from "./resume-quotation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const quotation = quotationSchema.parse(row.original);

  return (
    <DropdownMenu>
      <div className="relative">
        <ResumeQuotationTable quotation={quotation} />
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
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          {quotation.codeStatus === "Completada" ? (
            <button onClick={() => handleGeneratePdf(quotation)}>
              Comprobante
            </button>
          ) : (
            <>
              <button>Cancelar</button>
            </>
          )}
        </DropdownMenuItem>
        {(quotation.codeStatus === "Vencida" ||
          quotation.codeStatus === "Cancelada") && (
          <DropdownMenuItem>
            <DropdownMenuItem>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export type Quotation = z.infer<typeof quotationSchema>;
const handleGeneratePdf = (cotizacion: Quotation) => {
  generatePdf(cotizacion); // Llama a la función generatePdf pasando la cotización como argumento
};

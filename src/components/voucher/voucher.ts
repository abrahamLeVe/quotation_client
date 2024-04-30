import { dateSpanish } from "@/lib/utils";
import { convertirNumeroALetras } from "@/utilities/convert_to_number";
import { formatCurrency } from "@/utilities/utils";
import { z } from "zod";
import { quotationSchema } from "../quotation/table/data/schema";

export type Quotation = z.infer<typeof quotationSchema>;

export function generatePdf(cotizacion: Quotation) {
  import("jspdf").then((jsPDFModule) => {
    import("jspdf-autotable").then((autoTableModule) => {
      const jsPDF = jsPDFModule.default;
      const doc = new jsPDF();
      const autoTable = autoTableModule.default;

      doc.setFont("helvetica");
      doc.setFontSize(12);

      const companyName = "Consorcio A&C Eléctrica S.A.C";
      const companyAddress =
        "Calle. Juan Manuel Pereyra Nro. 536 Urb. Panamericana Norte";
      const companyCity = "Lima - Lima - Los Olivos";
      const companyRUC = "20603425627";

      const clientName = cotizacion.name;
      const clientAddress = cotizacion.direction;
      const clientEmail = cotizacion.email;
      const clientPhone = cotizacion.phone;
      const clientDocType = cotizacion.tipe_doc;
      const clientDocNumber = cotizacion.num_doc;
      const numCotizacion = cotizacion.id;
      const quotationState = cotizacion.codeStatus;

      const dueDate = dateSpanish(new Date(cotizacion.dateLimit));
      const startDate = dateSpanish(new Date(cotizacion.createdAt));

      const logoUrl =
        "https://res.cloudinary.com/dmpmxzyrg/image/upload/v1710720912/logo_app_e0c73ca462.png";
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = logoUrl;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx !== null) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");

          doc.addImage(dataUrl, "PNG", 10, 5, 50, 20);
        } else {
          console.error("Error: Contexto de renderizado nulo.");
        }

        autoTable(doc, {
          body: [
            [
              {
                content: "COTIZACIÓN",
                styles: { halign: "center", fontStyle: "bold" },
              },
            ],
            [{ content: "RUC: " + companyRUC, styles: { halign: "center" } }],
            [
              {
                content: "Nro: " + numCotizacion,
                styles: { halign: "center" },
              },
              companyRUC,
            ],
          ],
          startY: 10,
          theme: "plain",
          styles: {
            fontSize: 12,
            cellWidth: "wrap",
            cellPadding: 1,
            minCellWidth: 20,
          },
          margin: { left: 107 },
        });

        autoTable(doc, {
          body: [[companyName], [companyAddress], [companyCity]],
          startY: (doc as any).lastAutoTable.finalY,
          theme: "plain",
          styles: {
            fontSize: 12,
            cellWidth: "wrap",
            cellPadding: 1,
            minCellWidth: 20,
          },
        });

        autoTable(doc, {
          body: [
            ["Nombre", clientName],
            ["Email", clientEmail],
            ["Teléfono", clientPhone],
            ["Tipo de Documento", clientDocType!.toLocaleUpperCase()],
            ["Número de Documento", clientDocNumber],
            ["Dirección", clientAddress],
            ["Fecha de Creación", startDate],
            ["Fecha de Vencimiento", dueDate],
            ["Estado de cotización", quotationState],
          ],
          tableLineWidth: 0.1,
          startY: (doc as any).lastAutoTable.finalY + 5,
          theme: "plain",
          styles: { fontSize: 12, cellWidth: "wrap", cellPadding: 1 },
        });

        // Productos y sus detalles
        const productsInQuotation = cotizacion.products.map((product) => {
          const colorDetails = product
            .colors!.map(
              (color) => `${color!.color.attributes.name} x${color!.quantity}`
            )
            .join(", ");
          const measure = product.size ? product.size : "N/A";
          return {
            name: product.title || "Producto sin título",
            quantity: product.quantity,
            measure,
            subtotal: product.value ? product.quantity * product.value : 0,
            colors: colorDetails || "N/A",
          };
        });

        autoTable(doc, {
          head: [
            [
              "Ítem",
              "Descripción",
              "Cantidad",
              "Medidas",
              "Colores",
              "Precio Unitario",
              "Subtotal",
            ],
          ],
          body: productsInQuotation.map((product, index) => [
            index + 1,
            product.name,
            product.quantity,
            product.measure,
            product.colors,
            {
              content: formatCurrency(product.subtotal / product.quantity),
              styles: { halign: "right" },
            },
            {
              content: formatCurrency(product.subtotal),
              styles: { halign: "right" },
            },
          ]),
          startY: (doc as any).lastAutoTable.finalY + 10,
          theme: "grid",
          styles: { fontSize: 12 },
        });
        const total = productsInQuotation.reduce(
          (acc, product) => acc + product.subtotal,
          0
        );

        autoTable(doc, {
          body: [
            [
              "Total:",
              { content: formatCurrency(total), styles: { halign: "right" } },
            ],
            [
              {
                content: "SON:" + convertirNumeroALetras(total),
                colSpan: 5,
                styles: { halign: "left" },
              },
            ],
          ],
          startY: (doc as any).lastAutoTable.finalY + 10,
          theme: "grid",
          styles: { fontSize: 12 },
        });

        doc.save(`cotizacion_${cotizacion.id}.pdf`);
      };
    });
  });
}

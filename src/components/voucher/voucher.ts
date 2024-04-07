import { dateSpanish } from "@/lib/utils";
import { Quotation } from "@/models/quotation.model";
import { convertirNumeroALetras } from "@/utilities/convert_to_number";
import { formatCurrency } from "@/utilities/utils";

export function generatePdf(cotizacion: Quotation) {
  import("jspdf").then((jsPDFModule) => {
    import("jspdf-autotable").then((autoTableModule) => {
      const jsPDF = jsPDFModule.default;
      const doc = new jsPDF();
      const autoTable = autoTableModule.default;

      doc.setFont("helvetica");
      doc.setFontSize(12);

      const companyName = "DSS S.A";
      const companyAddress = "MIGUEL SEMINARIO 230";
      const companyCity = "LIMA-LIMA-SAN ISIDRO";
      const companyRUC = "20112811096";

      const clientName = cotizacion.name;
      const clientAddress = cotizacion.direction;
      const clientEmail = cotizacion.email;
      const clientPhone = cotizacion.phone;
      const clientDocType = cotizacion.tipe_doc;
      const clientDocNumber = cotizacion.num_doc;

      const dueDate = dateSpanish(new Date(cotizacion.dateLimit));

      // doc.addImage("./logoAyC.png", "PNG", 15, 10, 15, 15);

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
            { content: "F001 - 53948", styles: { halign: "center" } },
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
          ["Tipo de Documento", clientDocType],
          ["Número de Documento", clientDocNumber],
          ["Dirección", clientAddress],
          ["Fecha de Vencimiento", dueDate],
        ],
        tableLineWidth: 0.1,
        startY: (doc as any).lastAutoTable.finalY + 5,
        theme: "plain",
        styles: { fontSize: 12, cellWidth: "wrap", cellPadding: 1 },
      });

      const productsInQuotation = cotizacion.products.map((product) => {
        return {
          name: product.title || "Producto sin título",
          quantity: product.quantity,
          subtotal: product.value ? product.quantity * product.value : 0,
        };
      });

      autoTable(doc, {
        head: [["Ítem", "Descripción", "Cantidad", "Subtotal"]],
        body: productsInQuotation.map((product, index) => [
          index + 1,
          product.name,
          { content: product.quantity, styles: { halign: "right" } },
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
    });
  });
}

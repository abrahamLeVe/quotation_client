import { dateSpanish } from "@/lib/utils";
import { convertirNumeroALetras } from "@/utilities/convert_to_number";
import { formatCurrency } from "@/utilities/utils";
import { z } from "zod";
import { quotationSchema } from "../quotation/table/data/schema";

export type Quotation = z.infer<typeof quotationSchema>;

export function voucheMP(boleta: Quotation) {
  import("jspdf").then((jsPDFModule) => {
    import("jspdf-autotable").then((autoTableModule) => {
      const jsPDF = jsPDFModule.default;
      const doc = new jsPDF();
      const autoTable = autoTableModule.default;

      doc.setFont("helvetica");
      doc.setFontSize(12);

      // Información de la empresa
      const companyName = "Consorcio A&C Eléctrica S.A.C";
      const companyAddress =
        "Calle. Juan Manuel Pereyra Nro. 536 Urb. Panamericana Norte";
      const companyCity = "Lima - Lima - Los Olivos";
      const companyRUC = "20603425627";

      // Información del cliente
      const clientName = boleta.name;
      const clientAddress = boleta.direction;
      const clientEmail = boleta.email;
      const clientPhone = boleta.phone;
      const clientDocType = boleta.tipe_doc;
      const clientDocNumber = boleta.num_doc;
      const boletaId = boleta.id;

      // Información de pago
      const paymentAmount = formatCurrency(boleta.pago!.amount);
      const paymentStatus = boleta.pago!.status;
      const paymentId = boleta.pago!.payment_id;

      const dueDate = dateSpanish(new Date(boleta.dateLimit));
      const paymentCreatedAt = dateSpanish(new Date(boleta.pago?.createdAt!));

      // Logo
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

          // Encabezados y datos de la empresa
          autoTable(doc, {
            body: [
              [
                {
                  content: "BOLETA ELECTRÓNICA",
                  styles: { halign: "center", fontStyle: "bold" },
                },
              ],
              [{ content: "RUC: " + companyRUC, styles: { halign: "center" } }],
              [
                {
                  content: "Nro: " + boletaId,
                  styles: { halign: "center" },
                },
              ],
            ],
            startY: 30,
            theme: "plain",
            styles: {
              fontSize: 12,
              cellWidth: "wrap",
              cellPadding: 1,
              minCellWidth: 20,
            },
            margin: { left: 107 },
          });

          // Detalles del cliente
          autoTable(doc, {
            body: [
              ["Nombre", clientName],
              ["Email", clientEmail],
              ["Teléfono", clientPhone],
              ["Tipo de Documento", clientDocType!.toLocaleUpperCase()],
              ["Número de Documento", clientDocNumber],
              ["Dirección", clientAddress],
              ["Fecha de pago", paymentCreatedAt],
              ["Fecha de Vencimiento", dueDate],
            ],
            startY: (doc as any).lastAutoTable.finalY + 5,
            theme: "plain",
            styles: { fontSize: 12, cellWidth: "wrap", cellPadding: 1 },
          });

          // Productos y sus detalles
          const productsInQuotation = boleta.products.map((product) => {
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
                content: formatCurrency(product.subtotal),
                styles: { halign: "right" },
              },
            ]),
            startY: (doc as any).lastAutoTable.finalY + 10,
            theme: "grid",
            styles: { fontSize: 12 },
          });

          // Resumen y total
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
                  content: "SON: " + convertirNumeroALetras(total),
                  colSpan: 5,
                  styles: { halign: "left" },
                },
              ],
            ],
            startY: (doc as any).lastAutoTable.finalY + 10,
            theme: "grid",
            styles: { fontSize: 12 },
          });

          // Detalles del pago
          autoTable(doc, {
            body: [
              ["Método de Pago", "Mercado Pago"],
              ["Id de Pago", paymentId],
              [
                "Estado del Pago",
                paymentStatus === "approved" ? "Aprobado" : paymentStatus,
              ],
              ["Monto Pagado", paymentAmount],
            ],
            startY: (doc as any).lastAutoTable.finalY + 5,
            theme: "plain",
            styles: { fontSize: 12 },
          });

          doc.save(`boleta_${boletaId}.pdf`);
        }
      };
    });
  });
}

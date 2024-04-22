import z from "zod";

export const contactFormSchema = z.object({
  typeContact: z.string({
    required_error: "Seleccione un motivo para su mensaje.",
  }),

  email: z
    .string({
      required_error: "Requiere su email verificado.",
    })
    .email()
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres.",
    })
    .max(80, {
      message: "El nombre no debe tener más de 80 caracteres.",
    }),

  name: z
    .string({
      required_error: "Requiere un nombre.",
      invalid_type_error: "El nombre debe ser un texto.",
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres.",
    })
    .max(80, {
      message: "El nombre no debe tener más de 80 caracteres.",
    }),

  phone: z
    .string({
      required_error: "Requiere número telefónico.",
    })
    .min(6, {
      message: "El número telefónico debe tener al menos 6 caracteres.",
    })
    .max(13, {
      message: "El número telefónico no debe tener más de 15 caracteres.",
    }),

  title: z
    .string({
      required_error: "Requiere un título.",
    })
    .min(6, {
      message: "El título debe tener al menos 8 caracteres.",
    })
    .max(60, {
      message: "El título no debe tener más de 60 caracteres.",
    }),

  message: z
    .string()
    .min(8, {
      message: "El mensaje debe tener al menos 6 caracteres.",
    })
    .max(290, {
      message: "El mensaje no debe tener más de 290 caracteres.",
    }),

  rating: z
    .string({
      required_error: "Require un número menor a 5 y mayor a 0.",
    })
    .max(1, {
      message: "El mensaje debe tener al menos 6 caracteres.",
    }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

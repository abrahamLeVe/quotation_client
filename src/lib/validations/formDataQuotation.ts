import z from "zod";

export type ProfileFormValues = z.infer<typeof dataQuotationFormSchema>;

export const dataQuotationFormSchema = z.object({
  name: z
    .string({
      required_error: "Requiere un nombre.",
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres.",
    })
    .max(80, {
      message: "El nombre no debe tener más de 30 caracteres..",
    }),
  email: z
    .string({
      required_error: "Requiere su email verificado.",
    })
    .email(),
  tipe_doc: z.string({
    required_error: "Por favor selecione un tipo de documento.",
  }),
  direction: z
    .string({
      required_error: "Requiere una dirección.",
    })
    .min(6, {
      message: "La dirección debe tener al menos 8 caracteres.",
    })
    .max(110, {
      message: "La dirección no debe tener más de 60 caracteres.",
    }),
  num_doc: z
    .string()
    .min(8, {
      message: "El número debe tener al menos 8 caracteres.",
    })
    .max(11, {
      message: "El número no debe tener más de 11 caracteres.",
    }),
  phone: z
    .string({
      required_error: "Requiere número telefónico.",
    })
    .min(6, {
      message: "El número telefónico debe tener al menos 6 caracteres.",
    })
    .max(15, {
      message: "El número telefónico no debe tener más de 15 caracteres.",
    }),
  departamento: z.string({
    required_error: "Seleccione un departamento para mostrar.",
  }),
  provincia: z
    .string({
      required_error: "Seleccione una provincia para mostrar.",
    })
    .min(3, {
      message: "Seleccione una provincia para mostrar.",
    }),
  distrito: z
    .string({
      required_error: "Seleccione un distrito.",
    })
    .min(3, {
      message: "Seleccione un distrito.",
    }),
  details: z
    .string()
    .min(8, {
      message: "El comentario debe tener al menos 6 caracteres.",
    })
    .max(300, {
      message: "El comentario no debe tener más de 300 caracteres.",
    })
    .optional(),
  location: z.object({
    departamento: z.string({
      required_error: "Seleccione un departamento para mostrar.",
    }),
    provincia: z
      .string({
        required_error: "Seleccione una provincia para mostrar.",
      })
      .min(3, {
        message: "Seleccione una provincia para mostrar.",
      }),
    distrito: z.string().optional(),
  }),
});

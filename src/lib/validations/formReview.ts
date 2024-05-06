import z from "zod";

export const reviewFormSchema = z.object({
  message: z
    .string()
    .min(6, "El mensaje debe tener al menos 6 caracteres.")
    .max(150, "El mensaje no debe tener más de 150 caracteres."),

  rating: z
    .number({
      required_error: "La valoración es obligatoria.",
      invalid_type_error: "La valoración debe ser un número.",
    })
    .min(1, "La valoración debe ser al menos 1.")
    .max(5, "La valoración no puede ser mayor de 5."),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

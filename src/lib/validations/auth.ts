import z from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida",
  }),
  password: z
    .string()
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.",
    }),
  username: z
    .string()
    .min(8, {
      message: "El nombre de usuario debe tener al menos 6 caracteres",
    })
    .max(100),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida",
  }),
  password: z
    .string()
    .min(3, {
      message: "No se admiten espacios en blanco",
    })
    .max(100),
});

export const emailSchema = z.object({
  email: z
    .string()
    .email({
      message:
        "Por favor, introduce una dirección de correo electrónico válida",
    })
    .max(50, {
      message: "Ud pasó el límite de caracteres permitidos",
    }),
});

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
});

export const checkEmailSchema = z.object({
  email: authSchema.shape.email,
});

export const resetPasswordSchema = z
  .object({
    password: authSchema.shape.password,
    passwordConfirmation: authSchema.shape.password,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirmation"],
  });

export const userPrivateMetadataSchema = z.object({
  role: z.enum(["user", "admin", "super_admin"]),
  stripePriceId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.string().optional().nullable(),
});

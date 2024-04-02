import { z } from "zod";

const colorSchema = z
  .object({
    id: z.number().nullable().optional(),
    quantity: z.number().nullable().optional(),
  })
  .nullable();

const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  colors: z.array(colorSchema).nullable(),
  quantity: z.number(),
  picture_url: z.string(),
  size: z.string().optional().nullable(),
});
const locationSchema = z.object({
  departamento: z.string().nullable(),
  provincia: z.string().nullable(),
  distrito: z.string().nullable(),
});

export const quotationSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  email: z.string(),
  products: z.array(productSchema),
  name: z.string().nullable(),
  tipe_doc: z.string().nullable(),
  num_doc: z.string().nullable(),
  direction: z.string().nullable(),
  phone: z.string().nullable(),
  dayLimit: z.number(),
  details: z.string().nullable(),
  notes: z.string().nullable(),
  dateLimit: z.string(),
  codeStatus: z.string().nullable(),
  location: locationSchema,
});

export type Quotation = z.infer<typeof quotationSchema>;

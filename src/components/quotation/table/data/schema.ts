import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

const colorSchema = z
  .object({
    id: z.number().nullable().optional(),
    quantity: z.number().nullable().optional(),
  })
  .nullable();

const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  colors: z.array(colorSchema).nullable(),
  quantity: z.number(),
  picture_url: z.string(),
  size: z.string().optional(),
});

export const quotationSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  email: z.string(),
  products: z.array(productSchema),
  name: z.string().nullable(),
  ruc: z.string().nullable(),
  dni: z.string().nullable(),
  direction: z.string().nullable(),
  phone: z.string().nullable(),
  dayLimit: z.number(),
  details: z.string().nullable(),
  notes: z.string().nullable(),
  dateLimit: z.string(),
  codeStatus: z.string().nullable(),
});

export type Quotation = z.infer<typeof quotationSchema>;

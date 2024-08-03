import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  createdAt: z.string().optional(),
});

export const MessageArraySchema = z.array(MessageSchema);

export type Messages = z.infer<typeof MessageSchema>;

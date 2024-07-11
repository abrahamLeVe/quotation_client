import { OpenAIStreamPayload } from "@/models/message.model";

export const openaiRequest = async (payload: OpenAIStreamPayload) => {
  const res = await fetch(`${process.env.OPENIA_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  return res;
};

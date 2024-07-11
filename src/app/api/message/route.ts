import { OpenAIStream } from "@/lib/openai-strem";
import { MessageArraySchema } from "@/lib/validations/message";
import { generateChatbotPrompt } from "./chatbot-prompt";
import { ChatGPTMessage, OpenAIStreamPayload } from "@/models/message.model";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const parsedMessages = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
  }));

  const chatbotPrompt = await generateChatbotPrompt();

  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt,
  });

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: outboundMessages,
    temperature: 0.2,
    max_tokens: 500,
    stream: true,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}

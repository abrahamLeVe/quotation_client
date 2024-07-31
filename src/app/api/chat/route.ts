import { openai } from "@ai-sdk/openai";
import {
  StreamData,
  StreamingTextResponse,
  convertToCoreMessages,
  streamText,
} from "ai";
import { generateChatbotPrompt } from "./chatbot-prompt";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const chatbotPrompt = await generateChatbotPrompt();
  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages: convertToCoreMessages(messages),
    system: chatbotPrompt,
    maxTokens: 512,
    temperature: 0.3,
    maxRetries: 5,
  });

  const data = new StreamData();

  data.append({ test: "value" });

  const stream = result.toAIStream({
    onFinal(_) {
      data.close();
    },
  });

  return new StreamingTextResponse(stream, {}, data);
}

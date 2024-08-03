import { openai } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";
import { generateChatbotPrompt } from "./chatbot-prompt";

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();
  const chatbotPrompt = await generateChatbotPrompt();
  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
    system: chatbotPrompt,
    maxTokens: 512,
    temperature: 0.3,
    maxRetries: 5,
  });

  return result.toDataStreamResponse();
}

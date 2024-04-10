import OpenAI, { APIError } from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

// Use a named export for the POST method
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("errorapi ", error);
    if (error instanceof APIError && error.status === 429) {
      return new Response(
        JSON.stringify({
          error: "Exceeded API quota. Please try again later.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
}

import { openaiRequest } from "@/app/services/message.service";
import { OpenAIStreamPayload } from "@/models/message.model";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;
  const res = await openaiRequest(payload);

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || "";
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }

            const transformedText = transformText(text);

            const queue = encoder.encode(transformedText);
            controller.enqueue(queue);
            counter++;
          } catch (error) {
            controller.error(error);
          }
        }
      }

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  return stream;
}

function transformText(text: string): string {
  let transformedText = text.replace(
    /\[(.*?)\]\((http.*?)\)/g,
    (match, text, url) => {
      if (/\.(jpeg|jpg|gif|png|svg|webp)$/.test(url)) {
        return `<img src="${url}" alt="${text}">`;
      } else {
        return `<a href="${url}">${text}</a>`;
      }
    }
  );
  return transformedText;
}

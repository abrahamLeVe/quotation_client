"use client";
import { cn } from "@/lib/utils";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { FC, HTMLAttributes, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Message } from "@/lib/validations/message";
import SendMessageMutation from "@/lib/send-message";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [input, setInput] = useState<string>("");
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);
  const { sendMessage, isPending, error } = SendMessageMutation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (trimmedInput !== "") {
        const message: Message = {
          id: nanoid(),
          isUserMessage: true,
          text: trimmedInput.slice(0, 150),
        };
        sendMessage(message);
        setInput("");
      } else {
        return;
      }
    }
  };

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          ref={textareaRef}
          rows={2}
          onKeyDown={handleKeyDown}
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={150}
          autoFocus
          placeholder="Escribe un mensaje..."
          className="peer pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded bg-white border-gray-200 px-1 font-sans text-xs text-gray-400">
            {isPending ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <CornerDownLeft className="w-3 h-3" />
            )}
          </kbd>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-y-indigo-800 "
        ></div>
      </div>
    </div>
  );
};
export default ChatInput;

"use client";
import SendMessageMutation from "@/lib/send-message";
import { Message } from "@/lib/validations/message";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { HTMLAttributes, useRef, useState } from "react";
import { Textarea } from "../ui/textarea";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

export default function ChatInput({ className, ...props }: ChatInputProps) {
  const [input, setInput] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { sendMessage, isPending, error } = SendMessageMutation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (trimmedInput) {
        const message: Message = {
          id: nanoid(),
          isUserMessage: true,
          text: trimmedInput.slice(0, 100),
        };
        sendMessage(message);
        setInput("");
      }
    }
  };

  return (
    <div className="w-full relative">
      {error && (
        <div className="text-red-500 text-sm absolute inset-0 z-50">
          {error.message}
        </div>
      )}
      <div className="relative  flex-1 ">
        <Textarea
          ref={textareaRef}
          onKeyDown={handleKeyDown}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={100}
          autoFocus
          placeholder="Escribe un mensaje..."
          className="min-h-[40px] pr-10"
        />

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded bg-white border-gray-200 px-1 font-sans text-xs text-gray-400">
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CornerDownLeft className="w-4 h-4" />
            )}
          </kbd>
        </div>
      </div>
    </div>
  );
}

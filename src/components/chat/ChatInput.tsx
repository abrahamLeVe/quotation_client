"use client";
import SendMessageMutation from "@/lib/send-message";
import { Message } from "@/lib/validations/message";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import EmojiPopup from "./EmojiPopup";

export default function ChatInput() {
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

  const handleEmojiClick = (emoji: string) => {
    setInput(input + emoji);
    textareaRef.current?.focus();
  };

  return (
    <div className="w-full relative">
      {error && (
        <div className="text-red-500 bg-white text-xs absolute -top-5 z-50 px-1">
          {error.message}
        </div>
      )}
      <div className="relative flex-1">
        <div className="mb-1">
          <EmojiPopup onSelectEmoji={handleEmojiClick} />
        </div>
        <div className="relative">
          <Textarea
            id="message"
            ref={textareaRef}
            onKeyDown={handleKeyDown}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={100}
            autoFocus
            placeholder="Escribe un mensaje..."
            className="min-h-[40px] pr-10"
          />

          <div className="absolute inset-y-0 right-0 flex  ">
            <Button
              variant={"ghost"}
              className="inline-flex items-center pointer-events-none h-full text-gray-500"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CornerDownLeft className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

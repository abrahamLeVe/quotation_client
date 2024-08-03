"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Messages } from "@/lib/validations/message";
import { useContext, useRef, useState, useEffect } from "react";

import { MessagesContext } from "@/context/messages.context";
import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import { AlertCircle, CornerDownLeft, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import EmojiPopup from "./EmojiPopup";
import MarkdownLite from "./MarkdownLite";
import { ScrollArea } from "../ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function ChatSliderOver() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const {
    messages: messagesCtx,
    addMessage,
    addAssistantMessage,
  } = useContext(MessagesContext);
  const { input, handleInputChange, handleSubmit, isLoading, messages, error } =
    useChat({
      onFinish: (message: Message) => {
        addAssistantMessage(message.content);
      },
    });
  const [inputValue, setInputValue] = useState<string>(input);

  const inverseMessages =
    messages.length === 0 ? [...messagesCtx] : [...messages];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage: Messages = {
      id: nanoid(),
      role: "user",
      content: inputValue.slice(0, 100),
      createdAt: new Date().toISOString(),
    };
    addMessage(newMessage);
    handleSubmit(e);
    setInputValue("");
  };

  const handleEmojiClick = (emoji: string) => {
    const newInputValue = inputValue + emoji;
    setInputValue(newInputValue);
    handleInputChange({
      target: { value: newInputValue },
    } as React.ChangeEvent<HTMLInputElement>);
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    handleInputChange(e);
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="z-40">
        <Button
          variant="outline"
          className="p-2 rounded-full w-full h-full"
          title="Bit Buddy"
        >
          <img
            src="./bot.png"
            alt="chat bot"
            className="w-[60px] h-[60px]"
            loading="lazy"
          />
          <span aria-readonly={true}>Chatear</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md pt-24 gap-1 bg-inherit/20  backdrop-filter backdrop-blur-md">
        <SheetHeader className="fixed top-0 w-full">
          <div className="flex flex-row items-center gap-3 p-5">
            <img
              src="./botProfile.png"
              alt="chat bot"
              className="w-[40px] h-[40px]"
              loading="lazy"
            />
            <div>
              <SheetTitle className="text-yellow-500">Bit Buddy</SheetTitle>
              <SheetDescription className="text-gray-100">
                Soporte y búsqueda
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="w-full h-full flex flex-col justify-between gap-6">
          <ScrollArea className="overflow-y-auto overflow-x-hidden pr-3 z-50">
            <div className="flex flex-col gap-4">
              {inverseMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", {
                    "justify-end": message.role === "user",
                  })}
                >
                  <div
                    className={cn("relative px-4 py-2 rounded-lg", {
                      "text-gray-950 bg-white": message.role === "user",
                      "bg-gray-950 text-white ": message.role === "assistant",
                    })}
                  >
                    {message.role === "assistant" ? (
                      <Avatar className="bg-white p-1">
                        <AvatarImage src="./botMessage.png" alt="chat bot" />
                        <AvatarFallback>BB</AvatarFallback>
                      </Avatar>
                    ) : null}
                    <MarkdownLite text={message.content} />
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>
          <div className="flex flex-col gap-4">
            {error?.message ? (
              <Alert variant="destructive" className="bg-inherit">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error?.message}</AlertDescription>
              </Alert>
            ) : null}

            <SheetFooter className="flex flex-row relative">
              <EmojiPopup onSelectEmoji={handleEmojiClick} />
              <form onSubmit={onSubmit} className="w-full">
                <Input
                  id="message"
                  onChange={handleChange}
                  value={inputValue}
                  maxLength={100}
                  ref={inputRef}
                  autoFocus
                  placeholder="Escribe un mensaje..."
                  className="min-h-[40px]"
                />
                <div className="absolute inset-y-0 right-0 flex">
                  <Button
                    variant={"ghost"}
                    className="inline-flex items-center pointer-events-none h-full text-gray-500"
                    type="submit"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CornerDownLeft className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </form>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

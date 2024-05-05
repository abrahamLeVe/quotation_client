"use client";
import { MessagesContext } from "@/context/messages.context";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MarkdownLite from "./MarkdownLite";

export default function ChatMessages() {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div
      className="flex flex-col-reverse gap-4 overflow-y-auto max-h-[380px] pr-3"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#3b82f6 #e0f2fe",
      }}
    >
      {inverseMessages.map((message) => (
        <div
          key={message.id}
          className={cn("flex items-end", {
            "justify-end": message.isUserMessage,
          })}
        >
          <div
            className={cn("relative px-4 py-2 rounded-lg", {
              "bg-slate-100  dark:text-gray-900 dark:bg-white":
                message.isUserMessage,
              "bg-gray-900 text-white ": !message.isUserMessage,
            })}
          >
            {!message.isUserMessage ? (
              <Avatar className="bg-white p-1">
                <AvatarImage src="./botMessage.png" alt="chat bot" />
                <AvatarFallback>BB</AvatarFallback>
              </Avatar>
            ) : null}

            <MarkdownLite text={message.text} />
          </div>
        </div>
      ))}
    </div>
  );
}

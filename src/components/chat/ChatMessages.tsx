"use client";
import { MessagesContext } from "@/context/messages.context";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useContext } from "react";
import dynamic from "next/dynamic";
import { Icons } from "../Icons";

const MarkdownLite = dynamic(() => import("./MarkdownLite"), {
  ssr: false,
  loading: () => (
    <div className="w-[200px]  flex justify-center items-center">
      <div className="w-[20px] h-[20px]">
        <Icons.spinner />
      </div>
    </div>
  ),
});

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

export default function ChatMessages({
  className,
  ...props
}: ChatMessagesProps) {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div
      {...props}
      className={cn("flex flex-col-reverse gap-4 overflow-y-auto ", className)}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#3b82f6 #e0f2fe",
      }}
    >
      <div className="flex-1 flex-grow" />
      {inverseMessages.map((message) => (
        <div
          key={message.id}
          className={cn("flex items-end", {
            "justify-end": message.isUserMessage,
          })}
        >
          <div
            className={cn(
              "flex flex-col space-y-2 text-sm  overflow-x-hidden",
              {
                "order-1 items-end": message.isUserMessage,
                "order-2 items-start": !message.isUserMessage,
              }
            )}
          >
            <div
              className={cn("px-4 py-2 rounded-lg max-w-sm", {
                "bg-blue-600 text-white dark:text-blue-600 dark:bg-white":
                  message.isUserMessage,
                "bg-gray-900 text-white dark:backdrop-blur-md":
                  !message.isUserMessage,
              })}
            >
              {!message.isUserMessage ? (
                <div className="rounded-full w-[33px] h-[33px] bg-white flex items-center justify-center overflow-visible">
                  <img
                    src="./botMessage.png"
                    alt="chat bot"
                    className="w-[25px] h-[25px] "
                    loading="lazy"
                  />
                </div>
              ) : null}

              <MarkdownLite text={message.text} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

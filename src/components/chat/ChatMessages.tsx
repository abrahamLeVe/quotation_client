"use client";
import { MessagesContext } from "@/context/messages.context";
import { cn } from "@/lib/utils";
// import dynamic from "next/dynamic";
import { HTMLAttributes, useContext } from "react";
// import { Icons } from "../Icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MarkdownLite from "./MarkdownLite";

// const MarkdownLite = dynamic(() => import("./MarkdownLite"), {
//   ssr: false,
//   loading: () => (
//     <div className="w-[200px]  flex justify-center items-center">
//       <div className="w-[20px] h-[20px]">
//         <Icons.spinner />
//       </div>
//     </div>
//   ),
// });

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

export default function ChatMessages({}: ChatMessagesProps) {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div
      className="flex flex-col-reverse gap-4 overflow-y-auto max-h-[400px] pr-3"
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
            className={cn("px-4 py-2 rounded-lg", {
              "bg-blue-600 text-white dark:text-gray-900 dark:bg-white":
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

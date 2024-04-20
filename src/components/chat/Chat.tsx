"use client";
import { Separator } from "../ui/separator";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Chat() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="p-2 rounded-full w-full h-full">
          <img
            src="./bot.png"
            alt="chat bot"
            className="w-[60px] h-[60px]"
            loading="lazy"
          />
          <span aria-readonly={true}>Chatear</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={-75}
        className="h-[600px] max-w-sm w-full bg-white/75 dark:bg-black/75 backdrop-blur-md dark:border-zinc-200 relative"
      >
        <div className="flex flex-col h-full">
          <ChatHeader />
          <Separator className="border-t border-zinc-300" />
          <div className="flex flex-col h-full max-h-[450px]">
            <ChatMessages className="px-2 py-3 flex-1" />
          </div>
          <ChatInput className="px-4" />
        </div>
      </PopoverContent>
    </Popover>
  );
}

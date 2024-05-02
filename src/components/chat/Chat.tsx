"use client";
import { useSession } from "next-auth/react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SpeachButton } from "../filter/FilterButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function Chat() {
  const { data: session } = useSession();
  return (
    <>
      {!session ? (
        <SpeachButton
          className="p-2  w-[40px] h-[40px] "
          title={"Buscar"}
          variant="outline"
        />
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="p-2 rounded-full w-full h-full "
            >
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
            sideOffset={-95}
            className="p-0 border-none relative h-[620px] w-80 xs:w-[450px] bg-white/75 dark:bg-black/75 backdrop-blur-md"
          >
            <Card className="flex flex-col h-full bg-transparent justify-between">
              <div>
                <CardHeader className="flex flex-row items-center gap-3">
                  <img
                    src="./botProfile.png"
                    alt="chat bot"
                    className="w-[40px] h-[40px]"
                    loading="lazy"
                  />
                  <div>
                    <CardTitle>Bit Buddy</CardTitle>
                    <CardDescription>Soporte y búsqueda</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChatMessages />
                </CardContent>
              </div>
              <CardFooter>
                <ChatInput />
              </CardFooter>
            </Card>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}

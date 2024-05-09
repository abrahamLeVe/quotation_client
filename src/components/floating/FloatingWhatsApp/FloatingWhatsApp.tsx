"use client";
import { useCallback, useMemo, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FloatingWhatsAppProps } from "../../../models/floatingWa.model";

import { Textarea } from "@/components/ui/textarea";
import { SendSVG, WhatsappSVG } from "@/components/Icons";

const FormSchema = z.object({
  message: z.string().min(3).max(100),
});

export function FloatingWhatsApp({
  accountName = "Consorcio A&C Eléctrica S.A.C",
  avatar = "./user_whatsapp.jpg",
  statusMessage,
  initialMessageByServer,
  messageDelay = 2,
  disponible,
  placeholder,
}: FloatingWhatsAppProps) {
  const [isDelay, setIsDelay] = useState(true);

  const timeNow = useMemo(
    () =>
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    []
  );

  const handleOpen = useCallback(() => {
    setIsDelay(true);
    setTimeout(() => setIsDelay(false), messageDelay * 1000);
  }, [messageDelay]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const encodedMessage = encodeURIComponent(data.message.trim());
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_CLIENT_PHONE}&text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    form.setValue("message", "");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          onClick={handleOpen}
          className="flex items-center justify-center rounded-full h-16 w-16 p-3 bg-[#25d366] fill-white z-50"
        >
          <WhatsappSVG />
          <div className="rounded-full h-16 w-16  absolute  bg-[#25d366] animate-ping -z-10"></div>
        </div>
      </PopoverTrigger>
      <PopoverContent sideOffset={-160} className="w-96 p-0 mr-4">
        <Card className="bg-[#008069] dark:bg-[#1f2c34]">
          <CardHeader className="flex flex-row items-center gap-2 p-4">
            <div className="relative w-10 h-10">
              <Avatar className="">
                <AvatarImage src={avatar} alt="Gerente General" />
                <AvatarFallback>PG</AvatarFallback>
              </Avatar>
              {!disponible ? (
                <span className="absolute z-50 bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full border-2 border-white"></span>
              ) : (
                <span className="absolute z-50 bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              )}
            </div>
            <div className="text-white">
              <CardTitle>{accountName}</CardTitle>
              <CardDescription className="text-white">
                {statusMessage}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="h-48 p-0">
            <div
              className="bg-cover h-full "
              style={{
                backgroundImage: "url('bg-chat-tile-dark.png')",
              }}
            >
              <div className="h-full max-h-96 p-5">
                {isDelay ? (
                  <div className="inline-block py-4 px-7 bg-[#e6f8f1] rounded-bl-sm rounded-tl-3xl rounded-r-3xl">
                    <div className="bg-[#146945b3] rounded-[50%] h-2 w-2 inline-block mr-1 animate-bounce delay-200" />
                    <div className="bg-[#146945b3] rounded-[50%] h-2 w-2 inline-block mr-1 animate-bounce delay-300" />
                    <div className="bg-[#146945b3] rounded-[50%] h-2 w-2 inline-block mr-1 animate-bounce delay-500" />
                  </div>
                ) : (
                  <div className="bg-white  px-3 py-2 relative rounded-bl-md rounded-r-md">
                    <div className="absolute top-0 -left-3 w-0 h-0   border-solid border-t-0 border-r-[20px] border-b-[20px] border-l-0  border-b-transparent border-white border-t-transparent border-l-transparent"></div>
                    <span className="text-slate-500">{accountName}</span>
                    <p className="mt-1 text-black leading-5">
                      {initialMessageByServer}
                    </p>
                    <span className="flex mt-1 text-xs leading-4 justify-end text-[#11111180]">
                      {timeNow}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className=" p-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex justify-between items-center gap-2"
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={!disponible}
                          maxLength={100}
                          autoFocus
                          placeholder={placeholder}
                          className="resize-none min-h-[40px] w-[300px] pr-10"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              onSubmit(form.getValues());
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  variant={null}
                  type="submit"
                  className="p-0 dark:fill-white hover:opacity-70"
                >
                  <SendSVG />
                </Button>
              </form>
            </Form>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}

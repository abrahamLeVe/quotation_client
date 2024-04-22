"use client";
import { registerNewsletter } from "@/app/services/auth.service";
import { emailSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

export default function SuscriptionForm() {
  const [isSuscript, setIsSuscript] = useState(false);
  const [isPending, setIsPending] = useState(false);

  type Inputs = z.infer<typeof emailSchema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: Inputs) {
    try {
      setIsPending(true);
      setIsSuscript(true);
      if (isSuscript === false) {
        await registerNewsletter({ data });
      }
    } catch (error) {
      console.log("error in suscription ", error);
    } finally {
      setIsPending(false);

      return toast({
        variant: "default",
        title: "Registro",
        description: "Gracias por su suscripción",
      });
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          className="grid gap-4"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="rodneymullen180@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending}>
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Suscribirse
            <span className="sr-only">Suscribirse</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}

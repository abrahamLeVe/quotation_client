"use client";
import { registerUser } from "@/app/services/auth.service";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { useCartContext } from "@/context/cart.context";
import { handleErrorMessage } from "@/lib/exceptions";
import { Session } from "next-auth";
import Link from "next/link";
import { PasswordInput } from "../AuthPassword";

interface RegisterFormProps {
  session: Session | null;
  searchParams: {
    callbackUrl?: string;
    error?: string;
  };
}

export default function RegisterForm({
  session,
  searchParams,
}: RegisterFormProps) {
  console.log("ression de form ", session);
  if (session) {
    signOut({ redirect: false });
  }

  type Inputs = z.infer<typeof authSchema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const { isLoading, setIsLoading } = useCartContext();

  async function onSubmit(data: Inputs) {
    setIsLoading(true);

    try {
      const res = await registerUser(data);
      if (res.user) {
        console.log("res de regites", res);
        toast({
          variant: "default",
          title: "Cuenta creada correctamente",
          description: (
            <div className="flex flex-col gap-3">
              <span>
                Se ha enviado un correo electrónico de confirmación a{" "}
                <strong>{res.user.email}</strong> . Por favor, revise su bandeja
                de entrada y haga clic en el enlace de confirmación.
              </span>

              <span className="underline">
                <Link href={"/auth/signin"}>Ingresar click Aquí</Link>
              </span>
            </div>
          ),
          duration: 5000,
        });
      } else {
        const errorMessage = handleErrorMessage(res.error);

        toast({
          variant: "destructive",
          title: "Error de credenciales",
          description: (
            <div className="flex flex-col gap-3">
              <span>{errorMessage}</span>
              <span className="underline">
                <Link href={"/auth/resetpass"}>Restablecer contraseña</Link>
              </span>
            </div>
          ),
        });
      }
    } catch (error) {
      console.log("error RegisterForm ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="Rodrigo1987" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>
          {isLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  );
}

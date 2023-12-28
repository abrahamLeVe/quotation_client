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
import { AlertCircle } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PasswordInput } from "../AuthPassword";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function RegisterForm({
  className,
  ...props
}: UserAuthFormProps) {
  const { data: session } = useSession();
  if (session) {
    signOut({ redirect: false });
  }

  type Inputs = z.infer<typeof authSchema>;
  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(data: Inputs) {
    setIsPending(true);
    setError(false);

    const credentials = {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/dashboard/account",
    };

    try {
      const res = await registerUser(data);
      if (res.jwt) {
        await signIn("credentials", credentials);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
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
              <FormLabel>Nombre de ususario</FormLabel>
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
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
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
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              El correo electrónico o el nombre de usuario ya están en uso.
            </AlertDescription>
          </Alert>
        ) : null}
      </form>
    </Form>
  );
}

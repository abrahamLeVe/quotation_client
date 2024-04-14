"use client";
import { Icons } from "@/components/Icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useCartContext } from "@/context/cart.context";
import { loginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "../AuthPassword";

interface SigninFormProps {
  session: Session | null;
  searchParams?: {
    callbackUrl?: string;
    error?: string;
  };
}

export default function SigninForm({ session, searchParams }: SigninFormProps) {
  const { isLoading, setIsLoading } = useCartContext();
  if (session) {
    signOut({ redirect: false });
  }

  type Inputs = z.infer<typeof loginSchema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: Inputs) {
    setIsLoading(true);

    const credentials = {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/dashboard/order",
    };

    try {
      await signIn("credentials", credentials);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  return (
    <>
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

          {searchParams?.error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                El correo electrónico y/o la contraseña son incorrectos.
              </AlertDescription>
            </Alert>
          ) : null}
        </form>
      </Form>
    </>
  );
}

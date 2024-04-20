"use client";
import { changePass } from "@/app/services/auth.service";
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
import { toast } from "@/components/ui/use-toast";
import { useCartContext } from "@/context/cart.context";
import { handleErrorMessage } from "@/lib/exceptions";
import { emailSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SigninFormProps {
  session: Session | null;
  searchParams: {
    callbackUrl?: string;
    error?: string;
  };
}

export default function ResetPassForm({
  session,
  searchParams,
}: SigninFormProps) {
  const [isOk, setIsOk] = useState(false);
  const { isLoading, setIsLoading } = useCartContext();
  if (session) {
    signOut({ redirect: false });
  }

  type Inputs = z.infer<typeof emailSchema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: Inputs) {
    setIsLoading(true);

    try {
      const res = await changePass(data);

      if (res) {
        setIsOk(true);
      } else {
        const errorMessage = handleErrorMessage(res.error);

        toast({
          variant: "destructive",
          title: "Error de credenciales",
          description: (
            <div className="flex flex-col gap-3">
              <span>{errorMessage}</span>
              <span className="underline">
                <Link href={"/auth/register"}>Registrarse</Link>
              </span>
            </div>
          ),
        });
        setIsOk(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {!isOk ? (
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

            <Button>
              {isLoading && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Enviar solicitud
              <span className="sr-only">
                Continue to email verification page
              </span>
            </Button>

            {searchParams.error ? (
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
      ) : (
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Envío Exitoso</AlertTitle>
          <AlertDescription>
            Se ha enviado un correo electrónico de confirmación. Por favor,
            revise su bandeja de entrada y haga clic en el enlace de
            confirmación.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}

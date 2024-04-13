"use client";
import { resetPass } from "@/app/services/auth.service";
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
import { useCartContext } from "@/context/cart.context";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "../AuthPassword";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utilities/urls";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useState } from "react";

interface SigninFormProps {
  session: Session | null;
  code?: string;
}

export default function ChangePassForm({ session, code }: SigninFormProps) {
  const [isOk, setIsOk] = useState(false);
  const { isLoading, setIsLoading } = useCartContext();
  const router = useRouter();

  if (session) {
    signOut({ redirect: false });
  }
  type Inputs = z.infer<typeof resetPasswordSchema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(data: Inputs) {
    setIsLoading(true);
    setIsOk(true);

    try {
      const res = await resetPass({ ...data, code: code });

      if (res.jwt) {
        if (res.user.provider === "google") {
          router.push(`${API_URL}/api/connect/google`);
        } else {
          const credentials = {
            email: res.user.email,
            password: data.password,
            redirect: true,
            callbackUrl: "/dashboard/order",
          };
          await signIn("credentials", credentials);
        }
      } else {
        setIsOk(false);
        toast({
          variant: "destructive",
          title: "Error de credenciales",
          description: (
            <div className="flex flex-col gap-3">
              <span>Código incorrecto proporcionado</span>
              <span className="underline">
                <Link href={"/auth/signin"}>Ingresar click Aquí</Link>
              </span>
            </div>
          ),
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          className={` grid gap-4  ${isOk && "pointer-events-none"}`}
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="*********" {...field} />
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
            Resetear contraseña
            <span className="sr-only">Resetear contraseña</span>
          </Button>
        </form>
      </Form>
    </>
  );
}

"use client";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { API_URL } from "@/utilities/urls";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col w-full p-8 gap-4 `}>
      <Breadcrumbs
        segments={[
          {
            title: "Inicio",
            href: "/",
          },
          {
            title: "Login",
            href: "",
          },
        ]}
      />
      <Card className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
          <CardDescription>
            Elija su método de inicio de sesión preferido
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <a href={`${API_URL}/api/connect/google`}>
              <Button>
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O continuar con
              </span>
            </div>
          </div>
          {children}
          <div className="flex flex-row  items-center gap-2">
            <p className=" text-sm text-gray-500 ">¿No tienes una cuenta?</p>
            <Button className="font-semibold leading-6 " variant="link">
              <Link href="/auth/register">Regístrate</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            <span
              // href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Restablecer la contraseña
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

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
import { useCartContext } from "@/context/cart.context";
import Link from "next/link";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useCartContext();

  return (
    <div
      className={`flex flex-col w-full p-8 gap-4 ${
        isLoading && "pointer-events-none"
      }`}
    >
      <Breadcrumbs
        segments={[
          {
            title: "Inicio",
            href: "/",
          },
          {
            title: "Registro",
            href: "",
          },
        ]}
      />
      <Card className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Crear una cuenta</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {children}
          <div className="flex flex-row  items-center gap-2">
            <p className=" text-sm text-gray-500 ">¿Tienes una cuenta? </p>
            <Button className="font-semibold leading-6 " variant="link">
              <Link href="/auth/signin">Ingresar</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            <Link
              href="/auth/resetpass"
              className="underline underline-offset-4 hover:text-primary"
            >
              Restablecer la contraseña
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

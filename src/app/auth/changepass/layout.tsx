"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartContext } from "@/context/cart.context";

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useCartContext();

  return (
    <div
      className={`flex flex-col w-full p-8 gap-4 ${
        isLoading && "pointer-events-none"
      } `}
    >
      <Card className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Cambiar Contraseña</CardTitle>
          <CardDescription>Introduce su nueva contraseña.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">{children}</CardContent>
      </Card>
    </div>
  );
}

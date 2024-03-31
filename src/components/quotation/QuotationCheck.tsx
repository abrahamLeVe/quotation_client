"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import Link from "next/link";

export default function QuotationCheck() {
  const { data: session } = useSession();
  const router = useRouter();
  const checkUser = () => {
    if (!session) {
      return toast({
        variant: "destructive",
        title: "Requiere autenticación",
        description: (
          <div className="flex flex-col gap-3">
            <span>
              Para continuar y hacer el seguimiento de su cotización, por favor
              inicie sesión o regístrese.
            </span>
            <span className="underline">
              <Link href={"/auth/signin"}>Ingresar click Aquí</Link>
            </span>
            <span className="underline">
              <Link href={"/auth/register"}>Registrarse click Aquí</Link>
            </span>
          </div>
        ),
      });
    } else {
      router.push("/checkout", { scroll: true });
    }
  };

  return (
    <Button onClick={checkUser} variant={"outline"}>
      Generar cotización
      <span className="sr-only">Generar cotización</span>
    </Button>
  );
}

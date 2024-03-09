"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export default function QuotationCheck() {
  const { data: session } = useSession();
  const router = useRouter();
  const checkUser = () => {
    router.push("/checkout");
    if (!session) {
      return toast({
        variant: "destructive",
        title: "Iniciar sesión requerido",
        description:
          "Para continuar y hacer el seguimiento de su cotización, por favor inicie sesión o regístrese.",
      });
    }
  };

  return (
    <div>
      <Button onClick={checkUser}>
        Generar cotización
        <span className="sr-only">Generar cotización</span>
      </Button>
    </div>
  );
}

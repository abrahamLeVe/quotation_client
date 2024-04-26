"use client";
import { API_URL } from "@/utilities/urls";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export default function QuotationCheck() {
  const { data: session } = useSession();
  const router = useRouter();
  const checkUser = () => {
    if (!session) {
      return toast({
        variant: "destructive",
        title: "Requiere autenticación",
        description: (
          <div className="flex flex-col items-start gap-3">
            <span>
              Para continuar y hacer el seguimiento de su cotización, por favor
              inicie sesión o regístrese.
            </span>
            <Link
              href={"/auth/signin"}
              className="hover:underline text-inherit"
            >
              Ingresar click Aquí
            </Link>
            <div className="relative flex text-xs uppercase">
              <span>O continuar con</span>
            </div>
            <div>
              <a href={`${API_URL}/api/connect/google`}>
                <Button variant="outline">
                  <FaGoogle className=" h-4 w-4" />
                  Google
                </Button>
              </a>
            </div>
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

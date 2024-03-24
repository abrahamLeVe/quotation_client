"use client";

import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.log("error ", error);
  toast({
    variant: "destructive",
    title: "Error de credenciales",
    description: (
      <div className="flex flex-col gap-3">
        <span>{error.message}</span>
        <span className="underline">
          <Link href={"/auth/signin"}>Ingresar click Aquí</Link>
        </span>
      </div>
    ),
  });
};

export default error;

"use client";

import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  toast({
    variant: "destructive",
    title: "Error de autenticación",
    description: "Sesión expirada, requiere autenticación.",
  });
  redirect("/auth/signin");
};

export default error;
